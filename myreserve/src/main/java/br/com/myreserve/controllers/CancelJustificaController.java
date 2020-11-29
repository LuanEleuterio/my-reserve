package br.com.myreserve.controllers;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.myreserve.entities.CancelJustifica;
import br.com.myreserve.entities.Horario;
import br.com.myreserve.entities.Reserva;
import br.com.myreserve.repositories.CancelJustificaRepository;
import br.com.myreserve.repositories.HorarioRepository;
import br.com.myreserve.repositories.ReservaRepository;
import br.com.myreserve.services.RequisitaReservaService;

@CrossOrigin
@RestController
@RequestMapping("/cancel-justifica")
public class CancelJustificaController {
	
	@Autowired
	CancelJustificaRepository cancelJustificaRepository;
	@Autowired
	ReservaRepository reservaRepository;
	@Autowired
	HorarioRepository horarioRepository;
	
	private static String atNow;
	private static String dateNow;
	
	@GetMapping({"/{id_cancel}"})
	public Optional<CancelJustifica> getCancelamento(@PathVariable int id_cancel){
		return cancelJustificaRepository.findById(id_cancel);
	}
	
	@PostMapping()
	public Boolean addCancelamento(@RequestBody CancelJustifica cancelJustifica) throws Exception{
		Reserva reserva = reservaRepository.findById(cancelJustifica.getFk_reserva())
				.orElseThrow(() -> new IllegalAccessException());
		Horario horario = horarioRepository.findById(reserva.getFk_horario())
				.orElseThrow(() -> new IllegalAccessException());
		atNow = LocalDateTime.now(ZoneId.of("America/Sao_Paulo")).format(DateTimeFormatter.ofPattern("HH:mm:ss"));
		dateNow = LocalDateTime.now(ZoneId.of("America/Sao_Paulo")).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		cancelJustifica.setHora_cancelamento(atNow);
		cancelJustifica.setData_cancelamento(dateNow);
		
		
		if(cancelJustifica.getJustificativa() == null) {
			cancelJustifica.setJustificativa("Usuário cancelou a reserva!");
		}
		
		if(!reserva.getStatus_reserva().equals("Cancelado") && RequisitaReservaService.checkHour(atNow, horario.getHorario_de())) {				
			cancelJustificaRepository.save(cancelJustifica);
			
			reserva.setStatus_reserva("Cancelado");
			reservaRepository.save(reserva);
			
			horario.setVagas_at_moment(horario.getVagas_at_moment() + reserva.getQtd_pessoa());
			horarioRepository.save(horario);
		
			return true;
		} else {
			return false;
		}
		
	}

	
}
