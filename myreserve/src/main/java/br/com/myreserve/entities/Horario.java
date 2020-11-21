package br.com.myreserve.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Horario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_horario;
	
	private String horario_de;
	private String horario_ate;
	private Integer qtd_pessoa_vaga;
	private Integer total_vagas;
	private Integer vagas_at_moment;
	private Boolean ativo;
	private Integer fk_estabelecimento;

	public Horario() {}
	
	public Horario(String horario_de, String horario_ate, Integer qtd_pessoa_vaga, Integer total_vagas,
			Integer vagas_at_moment, Estabelecimento estabHorario, Boolean ativo, Integer fk_estabelecimento) {
		this.horario_de = horario_de;
		this.horario_ate = horario_ate;
		this.qtd_pessoa_vaga = qtd_pessoa_vaga;
		this.total_vagas = total_vagas;
		this.vagas_at_moment = vagas_at_moment;
		this.ativo = ativo;
		this.fk_estabelecimento = fk_estabelecimento;
	}

	public Integer getId_horario() {
		return id_horario;
	}

	public Boolean getAtivo() {
		return ativo;
	}

	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}

	public String getHorario_de() {
		return horario_de;
	}

	public void setHorario_de(String horario_de) {
		this.horario_de = horario_de;
	}


	public String getHorario_ate() {
		return horario_ate;
	}


	public void setHorario_ate(String horario_ate) {
		this.horario_ate = horario_ate;
	}


	public Integer getQtd_pessoa_vaga() {
		return qtd_pessoa_vaga;
	}


	public void setQtd_pessoa_vaga(Integer qtd_pessoa_vaga) {
		this.qtd_pessoa_vaga = qtd_pessoa_vaga;
	}


	public Integer getTotal_vagas() {
		return total_vagas;
	}


	public void setTotal_vagas(Integer total_vagas) {
		this.total_vagas = total_vagas;
	}


	public Integer getVagas_at_moment() {
		return vagas_at_moment;
	}


	public void setVagas_at_moment(Integer vagas_at_moment) {
		this.vagas_at_moment = vagas_at_moment;
	}

	public Integer getFk_estabelecimento() {
		return fk_estabelecimento;
	}

	public void setFk_estabelecimento(Integer fk_estabelecimento) {
		this.fk_estabelecimento = fk_estabelecimento;
	}
	
	

}

