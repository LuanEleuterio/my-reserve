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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.myreserve.entities.Estabelecimento;
import br.com.myreserve.entities.Horario;
import br.com.myreserve.entities.Reserva;
import br.com.myreserve.entities.Usuario;
import br.com.myreserve.repositories.EstabelecimentoRepository;
import br.com.myreserve.repositories.HorarioRepository;
import br.com.myreserve.repositories.ReservaRepository;
import br.com.myreserve.repositories.UsuarioRepository;
import br.com.myreserve.services.RequisitaReservaService;

@CrossOrigin
@RestController
@RequestMapping("/reserva")
public class ReservaController {
	
	@Autowired
	ReservaRepository reservaRepository;
	@Autowired
	UsuarioRepository usuarioRepository;
	@Autowired
	EstabelecimentoRepository estabRepository;
	@Autowired
	HorarioRepository horarioRepository;
	
	private static String atNow;
	private static String dateNow;
	
	@GetMapping()
	public Iterable<Reserva> getReservas(){
		return reservaRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Reserva> getReservasById(@PathVariable Integer id) {
		return reservaRepository.findById(id);
	}
	
	@GetMapping("/byUser/{id}")
	public Iterable<Reserva> getAllByUser(@PathVariable Integer id){
		return reservaRepository.findAllByUser(id);
	}
	
	@PostMapping()
	public void addReserva(@RequestBody Reserva reserva) {
		reservaRepository.save(reserva);
	}
	
	@CrossOrigin
	@PostMapping("/requisita")
	public Boolean requisitaReserva(@RequestBody Reserva reserva) throws Exception{
		
		atNow = LocalDateTime.now(ZoneId.of("America/Sao_Paulo")).format(DateTimeFormatter.ofPattern("HH:mm:ss"));
		dateNow = LocalDateTime.now(ZoneId.of("America/Sao_Paulo")).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		reserva.setHora_reserva(atNow);
		reserva.setData_reserva(dateNow);
		
		Horario hour = horarioRepository.findById(reserva.getFk_horario())
				.orElseThrow(() -> new IllegalAccessException());;
		
		if(RequisitaReservaService.checkInfoReserva(hour, reserva.getQtd_pessoa(), atNow)) {
			reserva.setHorario(hour);
			reserva.setStatus_reserva("Reservado");
			reservaRepository.save(reserva);
			
			hour.setVagas_at_moment(hour.getVagas_at_moment() - reserva.getQtd_pessoa());
			horarioRepository.save(hour);
			
			return true;
		}else{
			return false;
		}
	}

	@PutMapping("/{status}")
	public Reserva updateStatus(@PathVariable Integer id_reserva, @RequestBody Reserva statusReserva) throws Exception{
		Reserva reservaDB = reservaRepository.findById(id_reserva)
				.orElseThrow(() -> new IllegalAccessException());
		
		if(statusReserva.getStatus_reserva() != null) reservaDB.setStatus_reserva(statusReserva.getStatus_reserva());
		
		return reservaRepository.save(reservaDB);
	}
}
