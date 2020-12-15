package br.com.myreserve.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "cancel_justifica")
public class CancelJustifica {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_cancel;
	private String justificativa;
	private String hora_cancelamento;
	private String data_cancelamento;
	private Integer fk_reserva;
		
	@OneToOne
	@JoinColumn(name = "fk_reserva", insertable=false, updatable=false)
	@JsonIgnoreProperties("CancelJustifica")
	private Reserva reservaCancel;
	
	public CancelJustifica() {}

	public CancelJustifica(String justificativa, String hora_cancelamento, String data_cancelamento, Integer fk_reserva, Reserva reservaCancel) {
		this.justificativa = justificativa;
		this.hora_cancelamento = hora_cancelamento;
		this.data_cancelamento = data_cancelamento;
		this.fk_reserva = fk_reserva;
		this.reservaCancel = reservaCancel;
	}
	
	public int getId_cancel() {
		return id_cancel;
	}

	public String getJustificativa() {
		return justificativa;
	}

	public void setJustificativa(String justificativa) {
		this.justificativa = justificativa;
	}

	public String getHora_cancelamento() {
		return hora_cancelamento;
	}

	public void setHora_cancelamento(String hora_cancelamento) {
		this.hora_cancelamento = hora_cancelamento;
	}
	
	public String getData_cancelamento() {
		return data_cancelamento;
	}

	public void setData_cancelamento(String data_cancelamento) {
		this.data_cancelamento = data_cancelamento;
	}

	public Reserva getReservaCancel() {
		return reservaCancel;
	}

	public void setReservaCancel(Reserva reservaCancel) {
		this.reservaCancel = reservaCancel;
	}

	public Integer getFk_reserva() {
		return fk_reserva;
	}

	public void setFk_reserva(Integer fk_reserva) {
		this.fk_reserva = fk_reserva;
	}
		
}
