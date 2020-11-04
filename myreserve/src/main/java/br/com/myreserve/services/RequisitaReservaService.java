package br.com.myreserve.services;



import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import org.apache.tomcat.util.json.ParseException;
import org.springframework.beans.factory.annotation.Autowired;

import br.com.myreserve.entities.Estabelecimento;
import br.com.myreserve.entities.Horario;
import br.com.myreserve.entities.Reserva;
import br.com.myreserve.entities.Usuario;

public class RequisitaReservaService {
	
	private static String atNow;
	
	@Autowired
	Estabelecimento estabelecimentoRepository;
	@Autowired
	Usuario usuarioRepository;
	@Autowired
	Horario horarioRepository;
	@Autowired
	Reserva reservaRepository;
	
	public final static SimpleDateFormat parser = new SimpleDateFormat("HH:mm");
		
	public static void addReserva(Object identifiers, Integer qtdPessoas) throws Exception{
		
		atNow = LocalDateTime.now(ZoneId.of("America/Sao_Paulo")).minusHours(1).format(DateTimeFormatter.ofPattern("HH:mm"));
		   
		LocalDateTime.now(ZoneId.of("America/Sao_Paulo")).minusHours(1).format(DateTimeFormatter.ofPattern("HH:mm"));
		Horario horarioDB = horarioRepository.findById(identifiers.horario)
				.orElseThrow(() -> new IllegalAccessException());
		
		if(horarioDB.getVagas_at_moment() >= qtdPessoas && checkHour(atNow, horarioDB.getHorario_de())) {
			
		}
	}
	
	 public static boolean checkHour(String timeAtNow, String timeReserva) {
	        try {
	            Date present = parser.parse(timeAtNow);
	            Date reserva = parser.parse(timeReserva);
	            if (present.after(reserva)) {
	                return true;
	            }
	        } catch (ParseException e) {
	            // Invalid date was entered
	        }
	        return false;
	    }
	
	
}
