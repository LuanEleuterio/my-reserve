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
	private Date horario_de;
	private Date horario_ate;
	private Integer qtd_pessoa_vaga;
	private Integer total_vagas;
	private Integer vagas_at_moment;
	
	
	@ManyToOne
	@JoinColumn(name = "fk_estabelecimento")
	@JsonIgnoreProperties("horario")
	private Estabelecimento estabHorario;
	
	public Estabelecimento getEstabHorario() {
		return estabHorario;
	}
	
	public void setEstabHorario(Estabelecimento estabHorario) {
		this.estabHorario = estabHorario;
	}

	public Horario() {}
	
	public Horario(Date horario_de, Date horario_ate, Integer qtd_pessoa_vaga, Integer total_vagas,
			Integer vagas_at_moment, Estabelecimento estabHorario) {
		this.horario_de = horario_de;
		this.horario_ate = horario_ate;
		this.qtd_pessoa_vaga = qtd_pessoa_vaga;
		this.total_vagas = total_vagas;
		this.vagas_at_moment = vagas_at_moment;
	}

	public int getId_horario() {
		return id_horario;
	}

	public Date getHorario_de() {
		return horario_de;
	}


	public void setHorario_de(Date horario_de) {
		this.horario_de = horario_de;
	}


	public Date getHorario_ate() {
		return horario_ate;
	}


	public void setHorario_ate(Date horario_ate) {
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

}

