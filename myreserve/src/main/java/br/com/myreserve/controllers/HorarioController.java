package br.com.myreserve.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.myreserve.entities.Horario;
import br.com.myreserve.entities.Reserva;
import br.com.myreserve.repositories.HorarioRepository;
import br.com.myreserve.repositories.ReservaRepository;

@CrossOrigin
@RestController
@RequestMapping("/horario")
public class HorarioController {
	
	@Autowired
	private HorarioRepository horarioRepository;
	
	@Autowired 
	private ReservaRepository reservaRepository;
	
	@GetMapping
	public Iterable<Horario> getHorarios(){
		return horarioRepository.findAll();
	}
	
	@GetMapping("/{id_horario}")
	public Optional<Horario> getHorario(@PathVariable Integer id_horario){
		return horarioRepository.findById(id_horario);
	}
	
	@GetMapping("/byEstab/{idEstab}")
	public Iterable<Horario> getByEstabelecimento(@PathVariable Integer idEstab){
		return horarioRepository.selectAllByFk(idEstab);
	}
	
	@PostMapping()
	public void addHorario(@RequestBody Horario horario) {
		horario.setAtivo(true);
		horario.setVagas_at_moment(horario.getTotal_vagas());
		horarioRepository.save(horario);
	}
	
	@PutMapping("/altera")
	public Horario updateHorario(@RequestParam("idHour") Integer idHour, @RequestBody Horario horario) throws Exception{
		Horario horarioDB = horarioRepository.findById(idHour)
				.orElseThrow(() -> new IllegalAccessException());
		
		if(horario.getHorario_de() != null) horarioDB.setHorario_de(horario.getHorario_de());
		
		if(horario.getHorario_ate() != null) horarioDB.setHorario_ate(horario.getHorario_ate());
		
		if(horario.getQtd_pessoa_vaga() != null) horarioDB.setQtd_pessoa_vaga(horario.getQtd_pessoa_vaga());
			
		if(horario.getTotal_vagas() != null) horarioDB.setTotal_vagas(horario.getTotal_vagas());
		
		if(horario.getVagas_at_moment() != null) horarioDB.setVagas_at_moment(horario.getVagas_at_moment());
		
		horarioRepository.save(horarioDB);
		return horarioDB;
	}	
	
	@DeleteMapping("/{id_horario}")
	public void deleteHorario(@PathVariable Integer id_horario) throws IllegalAccessException {
		Reserva reserva = reservaRepository.selectByFkHorario(id_horario);
		
		if(reserva != null) {
			Horario hour = horarioRepository.findById(id_horario)
					.orElseThrow(() -> new IllegalAccessException());
			hour.setAtivo(false);
			horarioRepository.save(hour);
		}else {	
			horarioRepository.deleteById(id_horario);
		}
	}
	
}
