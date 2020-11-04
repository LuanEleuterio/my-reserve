	package br.com.myreserve.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
	
	@PostMapping("/requisita")
	public String requisitaReserva(@RequestParam("qtdPessoa") Integer qtdPessoas, @RequestParam("idUser") Integer idUser, 
			@RequestParam("idEstab") Integer idEstab, @RequestParam("idHour") Integer idHour, @RequestBody Reserva reserva) throws Exception{
		
		Usuario user = usuarioRepository.findById(idUser)
				.orElseThrow(() -> new IllegalAccessException());
		Estabelecimento estab = estabRepository.findById(idEstab)
				.orElseThrow(() -> new IllegalAccessException());
		Horario hour = horarioRepository.findById(idHour)
				.orElseThrow(() -> new IllegalAccessException());;
		
		if(RequisitaReservaService.addReserva(hour, qtdPessoas)) {
			reserva.setEstabReserva(estab);
			reserva.setUsuario(user);
			reserva.setHorario(hour);
			reservaRepository.save(reserva);
			return "Reserva feita com sucesso!";
		}else{
			return "Não foi possível realizar a reserva";
		}
	}
	
	@PutMapping("/{idEstab}")
	public Reserva updateReservaEstab(@PathVariable Integer idEstab, @RequestBody Reserva dadosReserva) throws Exception{
		Reserva reservaDB = reservaRepository.findById(idEstab)
				.orElseThrow(() -> new IllegalAccessException());
		
		if(dadosReserva.getValor_reserva() != null) reservaDB.setValor_reserva(dadosReserva.getValor_reserva());
		if(dadosReserva.getData_reserva() != null) reservaDB.setData_reserva(dadosReserva.getData_reserva());
		if(dadosReserva.getHora_reserva() != null) reservaDB.setHora_reserva(dadosReserva.getHora_reserva());
		if(dadosReserva.getStatus_reserva() != null) reservaDB.setStatus_reserva(dadosReserva.getStatus_reserva());
		if(dadosReserva.getQtd_pessoa() != null) reservaDB.setQtd_pessoa(dadosReserva.getQtd_pessoa());
		//if(dadosReserva.getFk_usuario() != null) reservaDB.setFk_usuario(dadosReserva.getFk_usuario());
		//if(dadosReserva.getFk_horario() != null) reservaDB.setFk_horario(dadosReserva.getFk_horario());
		
		return reservaRepository.save(reservaDB);
	}
}
