package com.omarket.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

/**
 * Entidade para armazenar metadados de imagens de produtos,
 * usando armazenamento em disco local.
 */
@Entity
@Table(name = "imagem_produto")
@Getter
@Setter
public class ImagemProduto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Associação com o produto a que esta imagem pertence.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;

    /**
     * Nome do arquivo armazenado no disco (por exemplo: "uuid-filename.jpg").
     */
    @Column(name = "file_name", nullable = false, length = 255)
    private String fileName;

    /**
     * Caminho relativo ou absoluto onde o arquivo está no servidor,
     * ex: "/uploads/images/uuid-filename.jpg".
     */
    @Column(name = "file_path", nullable = false, length = 500)
    private String filePath;

    /**
     * Data e hora do upload da imagem.
     */
    @Column(name = "uploaded_at", nullable = false)
    private LocalDateTime uploadedAt;
}
