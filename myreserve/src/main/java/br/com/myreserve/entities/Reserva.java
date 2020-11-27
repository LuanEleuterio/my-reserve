package br.com.myreserve.entities;

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
	private String data_reserva;
	private String hora_reserva;
	private String status_reserva;
	private Integer qtd_pessoa;
	private Integer fk_estabelecimento;
	private Integer fk_usuario;
	private Integer fk_horario;
		
	@OneToOne
	@JoinColumn(name = "fk_usuario", insertable=false, updatable=false)
	@JsonIgnoreProperties("usuarioReserva")
	private Usuario usuarioReserva;
	
	public Usuario getUsuario() {
		return usuarioReserva;
	}
	
	public void setUsuario(Usuario usuarioReserva) {
		this.usuarioReserva = usuarioReserva;
	}
	
	@OneToOne
	@JoinColumn(name = "fk_estabelecimento", insertable=false, updatable=false)
	@JsonIgnoreProperties(value = "reservaUser", allowGetters=false)
	private Estabelecimento estabReserva;
	
	public String getEstab() {
		return estabReserva.getNome();
	}
	
	public void setEstab(Estabelecimento estab) {
		this.estabReserva = estab;
	}
	
	@OneToOne
	@JoinColumn(name = "fk_horario", insertable=false, updatable=false)
	private Horario horario;
	
	public Horario getHorario() {
		return horario;
	}
	
	public void setHorario(Horario horario) {
		this.horario = horario;
	}
	
	public Reserva() {}
	
	public Reserva(Double valor_reserva, String data_reserva, String hora_reserva, String status_reserva, Integer qtd_pessoa, Integer fk_usuario, Integer fk_horario, Integer fk_estabelecimento) {
		this.valor_reserva = valor_reserva;
		this.data_reserva = data_reserva;
		this.hora_reserva = hora_reserva;
		this.status_reserva = status_reserva;
		this.qtd_pessoa = qtd_pessoa;
		this.fk_usuario = fk_usuario;
		this.fk_estabelecimento = fk_estabelecimento;
		this.fk_horario = fk_horario;
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

	public String getData_reserva() {
		return data_reserva;
	}

	public void setData_reserva(String data_reserva) {
		this.data_reserva = data_reserva;
	}

	public String getHora_reserva() {
		return hora_reserva;
	}

	public void setHora_reserva(String hora_reserva) {
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

	public Integer getFk_estabelecimento() {
		return fk_estabelecimento;
	}

	public void setFk_estabelecimento(Integer fk_estabelecimento) {
		this.fk_estabelecimento = fk_estabelecimento;
	}

	public Integer getFk_usuario() {
		return fk_usuario;
	}

	public void setFk_usuario(Integer fk_usuario) {
		this.fk_usuario = fk_usuario;
	}

	public Integer getFk_horario() {
		return fk_horario;
	}

	public void setFk_horario(Integer fk_horario) {
		this.fk_horario = fk_horario;
	}
	
	

}
