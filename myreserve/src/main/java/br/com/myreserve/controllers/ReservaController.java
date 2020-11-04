package br.com.myreserve.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.myreserve.entities.Reserva;
import br.com.myreserve.repositories.ReservaRepository;

@RestController
@RequestMapping("/reserva")
public class ReservaController {
	
	@Autowired
	ReservaRepository reservaRepository;
	
	@GetMapping()
	public Iterable<Reserva> getReservas(){
		return reservaRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Reserva> getReservasById(@PathVariable int id) {
		return reservaRepository.findById(id);
	}
	
	@PostMapping()
	public void addReserva(@RequestBody Reserva reserva) {
		reservaRepository.save(reserva);
	}
	
	@PutMapping("/{idEstab}")
	public Reserva updateReservaEstab(@PathVariable Integer idEstab, @RequestBody Reserva dadosReserva) throws Exception{
		Reserva reservaDB = reservaRepository.findOneByFk_estabelecimento(idEstab);
		
		if(dadosReserva.getValor_reserva() != null) reservaDB.setValor_reserva(dadosReserva.getValor_reserva());
		if(dadosReserva.getData_reserva() != null) reservaDB.setData_reserva(dadosReserva.getData_reserva());
		if(dadosReserva.getHora_reserva() != null) reservaDB.setHora_reserva(dadosReserva.getHora_reserva());
		if(dadosReserva.getStatus_reserva() != null) reservaDB.setStatus_reserva(dadosReserva.getStatus_reserva());
		if(dadosReserva.getQtd_pessoa() != null) reservaDB.setQtd_pessoa(dadosReserva.getQtd_pessoa());
		if(dadosReserva.getFk_usuario() != null) reservaDB.setFk_usuario(dadosReserva.getFk_usuario());
		if(dadosReserva.getFk_horario() != null) reservaDB.setFk_horario(dadosReserva.getFk_horario());
		
		return reservaRepository.save(reservaDB);
	}
	
}
