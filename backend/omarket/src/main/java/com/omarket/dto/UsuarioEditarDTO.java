package com.omarket.dto;

import java.time.LocalDate;

import com.omarket.entity.enum_.StatusUsuario;
import com.omarket.entity.enum_.TipoUsuario;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioEditarDTO {
    private Long id;
    
    @NotBlank(message = "Nome é obrigatório!")
    @Size(min = 3, max = 70, message = "O nome deve ter entre 3 e 70 caracteres")
    private String nome;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "O email deve ser válido")
    private String email;

    @Size(min = 6, message = "Senha deve ter no mínimo 6 caracteres")
    private String senha;

    @NotBlank(message = "Telefone é obrigatório!")
    private String telefone;

    private StatusUsuario status;

    private TipoUsuario tipoUsuario;

    @Valid
    private EnderecoDTO enderecoDTO;

    // ======= CAMPOS ESPECÍFICOS PARA CLIENTE    =======
    @org.hibernate.validator.constraints.br.CPF(message = "CPF inválido!")
    private String cpf;
    private LocalDate dataNascimento;

    // ======= CAMPOS ESPECÍFICOS PARA FORNECEDOR =======
    //@org.hibernate.validator.constraints.br.CNPJ(message = "CNPJ inválido!")
    private String cnpj;

    // ======= CAMPOS ESPECÍFICOS PARA ADM        =======

}
