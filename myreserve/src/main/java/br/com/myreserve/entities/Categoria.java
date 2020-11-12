package br.com.myreserve.entities;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Categoria {

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_categoria;
	private String tipo_categoria;
	private String img_categoria;
	
	public Categoria() {}

	public Categoria(String tipo_categoria, String img_categoria) {
		this.tipo_categoria = tipo_categoria;
		this.img_categoria = img_categoria;
	}

	public Integer getId_categoria() {
		return id_categoria;
	}

	public String getTipo_categoria() {
		return tipo_categoria;
	}

	public void setTipo_categoria(String tipo_categoria) {
		this.tipo_categoria = tipo_categoria;
	}

	public String getImg_categoria() {
		return img_categoria;
	}

	public void setImg_categoria(String img_categoria) {
		this.img_categoria = img_categoria;
	}

}
