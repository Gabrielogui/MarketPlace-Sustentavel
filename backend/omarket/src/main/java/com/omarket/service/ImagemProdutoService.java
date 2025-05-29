package com.omarket.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.omarket.dto.ImagemProdutoDTO;
import com.omarket.dto.ImagemProdutoInputDTO;
import com.omarket.entity.ImagemProduto;
import com.omarket.entity.Produto;
import com.omarket.repository.ImagemProdutoRepository;
import com.omarket.repository.ProdutoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImagemProdutoService {
    private final ImagemProdutoRepository imagemProdutoRepository;
    private final ProdutoRepository produtoRepository;

    // REVER
    private static final Path UPLOAD_DIR = Paths.get("uploads");

    @Transactional
    public ImagemProdutoDTO upload(ImagemProdutoInputDTO imagemProdutoInputDTO){
        Long idProduto = imagemProdutoInputDTO.getProdutoId();
        Produto produto = produtoRepository.findById(idProduto)
            .orElseThrow(() -> new RuntimeException("Produto não encontrado com ID: " + idProduto));

        // REVER
        // 2) gera nome único
        MultipartFile file = imagemProdutoInputDTO.getFile();
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Arquivo não pode ser vazio ou nulo.");
        }
        String original = file.getOriginalFilename();
        String ext = (original != null && original.contains("."))
            ? original.substring(original.lastIndexOf('.'))
            : "";
        String filename = UUID.randomUUID() + ext;

        // 3) monta diretório baseado no package e nome da classe
        String fqcn = ImagemProduto.class.getName();       // "com.omarket.entity.ImagemProduto"
        String[] parts = fqcn.split("\\.");                // ["com","omarket","entity","ImagemProduto"]
        // pega todos menos o último para formar o path do package
        Path uploadDir = Paths.get(UPLOAD_DIR.toString(), 
            Arrays.copyOf(parts, parts.length - 1));      // "/var/www/uploads/com/omarket/entity"
        // depois adiciona o simpleName como última pasta
        uploadDir = uploadDir.resolve(ImagemProduto.class.getSimpleName());

        // 4) salva o arquivo no disco
        Path target = uploadDir.resolve(filename);
        try {
            Files.createDirectories(UPLOAD_DIR);
            file.transferTo(target.toFile());
        } catch (IOException e) {
            throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR, 
                "Falha ao salvar arquivo no disco", e);
            }
        
        ImagemProduto imagemProduto = new ImagemProduto();
    
        imagemProduto.setProduto(produto);
        imagemProduto.setFileName(filename);
        imagemProduto.setFilePath(target.toString());
        imagemProduto.setUploadedAt(LocalDateTime.now());
        imagemProdutoRepository.save(imagemProduto);
        return converterParaDTO(imagemProduto);

    }

    @Transactional
    public void deletar(Long id) {
        ImagemProduto imagemProduto = imagemProdutoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Imagem não encontrada com ID: " + id));

        // Deletar a entrada no banco de dados
        imagemProdutoRepository.delete(imagemProduto);
        
        // Deletar o arquivo do disco
        try {
            Files.deleteIfExists(Paths.get(imagemProduto.getFilePath()));
            
        } catch (IOException e) {
            throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR, 
                "Falha ao deletar arquivo do disco", e);
        }
        
    }

    @Transactional(readOnly = true)
    public ImagemProdutoDTO buscarPorId(Long id) {
        ImagemProduto imagemProduto = imagemProdutoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Imagem não encontrada com ID: " + id));
        return converterParaDTO(imagemProduto);
    }

    public static ImagemProdutoDTO converterParaDTO(ImagemProduto img) {
        if (img == null) {
            return null;
        }
        ImagemProdutoDTO dto = new ImagemProdutoDTO();
        dto.setId(img.getId());
        dto.setProdutoId(img.getProduto().getId()); // só o ID, não o objeto
        dto.setFileName(img.getFileName());
        dto.setFilePath(img.getFilePath());
        dto.setUploadedAt(img.getUploadedAt());
        return dto;
    }

}
