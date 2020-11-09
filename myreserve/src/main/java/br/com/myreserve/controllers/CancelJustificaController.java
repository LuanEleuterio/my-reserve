package br.com.myreserve.controllers;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.myreserve.entities.CancelJustifica;
import br.com.myreserve.entities.Reserva;
import br.com.myreserve.repositories.CancelJustificaRepository;
import br.com.myreserve.repositories.ReservaRepository;

@RestController
@RequestMapping("/cancel-justifica")
public class CancelJustificaController {
	
	@Autowired
	CancelJustificaRepository cancelJustificaRepository;
	@Autowired
	ReservaRepository reservaRepository;
	
	private static String atNow;
	private static String dateNow;
	
	@GetMapping({"/{id_cancel}"})
	public Optional<CancelJustifica> getCancelamento(@PathVariable int id_cancel){
		return cancelJustificaRepository.findById(id_cancel);
	}
	
	@PostMapping()
	public void addCancelamento(@RequestBody CancelJustifica cancelJustifica) throws Exception{
		Reserva reserva = reservaRepository.findById(cancelJustifica.getFk_reserva())
				.orElseThrow(() -> new IllegalAccessException());
		atNow = LocalDateTime.now(ZoneId.of("America/Sao_Paulo")).minusHours(1).format(DateTimeFormatter.ofPattern("HH:mm:ss"));
		dateNow = LocalDateTime.now(ZoneId.of("America/Sao_Paulo")).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		cancelJustifica.setHora_cancelamento(atNow);
		cancelJustifica.setData_cancelamento(dateNow);
		
		if(cancelJustifica.getJustificativa() == null) {
			cancelJustifica.setJustificativa("Usuário cancelou a reserva!");
		}
		
		cancelJustificaRepository.save(cancelJustifica);
		
		reserva.setStatus_reserva("Cancelado");
		reservaRepository.save(reserva);
	}

	
}
