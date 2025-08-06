package com.omarket.controller;

import java.math.BigDecimal;
import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.omarket.dto.ProdutoDTO;
import com.omarket.service.ProdutoService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/produto")
@RequiredArgsConstructor
public class ProdutoController {

    private final ProdutoService produtoService;

    // ======= MÉTODO PARA CADASTRAR UM PRODUTO =======
    @PostMapping("/cadastrar")
    public ResponseEntity<ProdutoDTO> cadastrar(@RequestBody @Validated ProdutoDTO produtoDTO){ 
        ProdutoDTO produtoNovo = produtoService.cadastrar(produtoDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(produtoNovo.getId())
            .toUri();

        return ResponseEntity.created(location).body(produtoNovo);
        
    }

    // ======= MÉTODO GET PARA VISUALIZAR UM PRODUTO =======
    @GetMapping("/{id}")
    public ResponseEntity<ProdutoDTO> visualizar(@PathVariable Long id){
        ProdutoDTO produtoDTO = produtoService.visualizar(id);
        return ResponseEntity.ok(produtoDTO);
    }

    // ======= MÉTODO GET PARA LISTAR UM PRODUTO =======
    @GetMapping("/listar")
    public ResponseEntity<List<ProdutoDTO>> listar(){
        List<ProdutoDTO> produtosDTO = produtoService.listar();
        return ResponseEntity.ok(produtosDTO);
    }

    // ======= MÉTODO GET PARA LISTAR PRUDUTOS POR FORNECEDOR =======
    @GetMapping("/listar/fornecedor/{fornecedorId}")
    public ResponseEntity<List<ProdutoDTO>> listarPorFornecedor(@PathVariable Long fornecedorId){
        List<ProdutoDTO> produtosDTO = produtoService.listarPorFornecedor(fornecedorId);
        return ResponseEntity.ok(produtosDTO);
    }

    // ======= MÉTODO GET PARA LISTAR PRODUTO POR CATEGORIA =======
    @GetMapping("/listar/categoria/{categoriaId}")
    public ResponseEntity<List<ProdutoDTO>> listarPorCategoria(@PathVariable Long categoriaId){
        List<ProdutoDTO> produtosDTO = produtoService.listarPorCategoria(categoriaId);
        return ResponseEntity.ok(produtosDTO);
    }

    // ======= MÉTODO PARA ATIVAR O PRODUTO =======
    @PatchMapping("/{id}/ativar")
    public ResponseEntity<ProdutoDTO> ativar(@PathVariable Long id){
        ProdutoDTO produtoAtivado = produtoService.ativar(id);
        return ResponseEntity.ok(produtoAtivado);
    }

    // ======= MÉTODO PARA DESATIVAR O PRODUTO =======
    @PatchMapping("/{id}/desativar")
    public ResponseEntity<ProdutoDTO> desativar(@PathVariable Long id){
        ProdutoDTO produtoDesativado = produtoService.desativar(id);
        return ResponseEntity.ok(produtoDesativado);
    }

    // ======= MÉTODO PARA EDITAR UM PRODUTO =======
    @PutMapping("/{id}")
    public ResponseEntity<ProdutoDTO> editar(@PathVariable Long id, @RequestBody @Validated ProdutoDTO produtoDTO){
        ProdutoDTO produtoEditado = produtoService.editar(id, produtoDTO);
        return ResponseEntity.ok(produtoEditado);
    }

    // ======= MÉTODO PARA BUSCAR O PRODUTO POR NOME =======
    @GetMapping("/buscar/{nome}")
    public ResponseEntity<List<ProdutoDTO>> buscarPorNome(@PathVariable String nome) {
        List<ProdutoDTO> produtosDTO = produtoService.buscarPorNome(nome);
        return ResponseEntity.ok(produtosDTO);
    }

    // ======= MÉTODO PARA FILTRAR OS PRODUTOS =======
    @GetMapping("/filtrar")
    public ResponseEntity<List<ProdutoDTO>> filtrar(
        @RequestParam(name = "precoMin", required = false) BigDecimal precoMin,
        @RequestParam(name = "precoMax", required = false) BigDecimal precoMax,
        @RequestParam(name = "notaMin",  required = false) Integer notaMin,
        @RequestParam(name = "order",    required = false, defaultValue = "asc") String order
    ){
        List<ProdutoDTO> produtosFiltrados = produtoService.filtrar(precoMin, precoMax, notaMin, order);
        return ResponseEntity.ok(produtosFiltrados);
    }
    

}
