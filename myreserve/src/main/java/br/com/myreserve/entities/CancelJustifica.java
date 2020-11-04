package br.com.myreserve.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class CancelJustifica {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_cancel;
	private String justificativa;
	private Date hora_cancelamento;
	
	@OneToOne
	@JoinColumn(name = "fk_reserva")
	@JsonIgnoreProperties("CancelJustifica")
	private Reserva reservaCancel;
	
	
	public CancelJustifica() {}

	public int getId_cancel() {
		return id_cancel;
	}

	public void setId_cancel(int id_cancel) {
		this.id_cancel = id_cancel;
	}

	public String getJustificativa() {
		return justificativa;
	}

	public void setJustificativa(String justificativa) {
		this.justificativa = justificativa;
	}

	public Date getHora_cancelamento() {
		return hora_cancelamento;
	}

	public void setHora_cancelamento(Date hora_cancelamento) {
		this.hora_cancelamento = hora_cancelamento;
	}

	public Reserva getReservaCancel() {
		return reservaCancel;
	}

	public void setReservaCancel(Reserva reservaCancel) {
		this.reservaCancel = reservaCancel;
	}
	
	
	
	
}
