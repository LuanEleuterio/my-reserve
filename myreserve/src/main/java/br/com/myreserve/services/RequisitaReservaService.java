package br.com.myreserve.services;

import org.springframework.beans.factory.annotation.Autowired;

import br.com.myreserve.entities.Estabelecimento;

public class RequisitaReservaService {
	
	@Autowired
	Estabelecimento estabelecimentoRepository;
	@Autowired
	Usuario usuarioRepository;
	@Autowired
	Horario horarioRepository;
	@Autowired
	Reserva reservaRepository;
		
	public static void addReserva(Object identifiers, Integer qtdPessoas) throws Exception{
		Horario horarioDB = horarioRepository.findById(identifiers.horario)
				.orElseThrow(() -> new IllegalAccessException());
		
		if(horarioDB.getVagas_at_moment() >= qtdPessoas) {
			
		}
	}
}
