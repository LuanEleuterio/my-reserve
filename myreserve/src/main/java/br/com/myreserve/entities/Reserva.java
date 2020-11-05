package br.com.myreserve.entities;

import java.util.Date;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Reserva {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_reserva;
	private Double valor_reserva;
	private Date data_reserva;
	private Date hora_reserva;
	private String status_reserva;
	private Integer qtd_pessoa;
	
	@ManyToOne
	@JoinColumn(name = "fk_estabelecimento")
	@JsonIgnoreProperties("reserva")
	private Estabelecimento estabReserva;
	
	public Estabelecimento getEstabReserva() {
		return estabReserva;
	}
	
	public void setEstabReserva(Estabelecimento estabReserva) {
		this.estabReserva = estabReserva;
	}
	
	@ManyToOne
	@JoinColumn(name = "fk_usuario")
	@JsonIgnoreProperties("reservaUser")
	private Usuario usuario;
	
	public Usuario getUsuario() {
		return usuario;
	}
	
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	
	@OneToOne
	@JoinColumn(name = "fk_id_horario")
	private Horario horario;
	
	public Horario getHorario() {
		return horario;
	}
	
	public void setHorario(Horario horario) {
		this.horario = horario;
	}
	
	public Reserva() {}
	
	public Reserva(Double valor_reserva, Date data_reserva, Date hora_reserva, String status_reserva, Integer qtd_pessoa, Integer fk_usuario, Integer fk_horario) {
		this.valor_reserva = valor_reserva;
		this.data_reserva = data_reserva;
		this.hora_reserva = hora_reserva;
		this.status_reserva = status_reserva;
		this.qtd_pessoa = qtd_pessoa;
	}

	public Integer getId_reserva() {
		return id_reserva;
	}
	
	public Double getValor_reserva() {
		return valor_reserva;
	}

	public void setValor_reserva(Double valor_reserva) {
		this.valor_reserva = valor_reserva;
	}

	public Date getData_reserva() {
		return data_reserva;
	}

	public void setData_reserva(Date data_reserva) {
		this.data_reserva = data_reserva;
	}

	public Date getHora_reserva() {
		return hora_reserva;
	}

	public void setHora_reserva(Date hora_reserva) {
		this.hora_reserva = hora_reserva;
	}

	public String getStatus_reserva() {
		return status_reserva;
	}

	public void setStatus_reserva(String status_reserva) {
		this.status_reserva = status_reserva;
	}

	public Integer getQtd_pessoa() {
		return qtd_pessoa;
	}

	public void setQtd_pessoa(Integer qtd_pessoa) {
		this.qtd_pessoa = qtd_pessoa;
	}

}
