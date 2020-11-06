package br.com.myreserve.services;



import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

import br.com.myreserve.entities.Estabelecimento;
import br.com.myreserve.entities.Horario;
import br.com.myreserve.entities.Reserva;
import br.com.myreserve.entities.Usuario;

import br.com.myreserve.repositories.EstabelecimentoRepository;
import br.com.myreserve.repositories.HorarioRepository;
import br.com.myreserve.repositories.ReservaRepository;
import br.com.myreserve.repositories.UsuarioRepository;

public class RequisitaReservaService {
	
	//private static String atNow;
	private static String timeReserva;

	
	public final static SimpleDateFormat parser = new SimpleDateFormat("HH:mm");
	
	@Bean
	public static boolean addReserva(Horario horario, Integer qtdPessoas, String atNow) throws Exception{
		//atNow = LocalDateTime.now(ZoneId.of("America/Sao_Paulo")).minusHours(1).format(DateTimeFormatter.ofPattern("HH:mm"));
		if(horario.getVagas_at_moment() >= qtdPessoas && checkHour(atNow, horario.getHorario_de())) {
			return true;
		}
		return false;
	}
	
	@Bean
	 public static boolean checkHour(String timeAtNow, String timeReserva) throws java.text.ParseException{
	        	//timeReserva = parser.format(timeReserva);
	            Date present = parser.parse(timeAtNow);
	            Date reserva = parser.parse(timeReserva);
	            if (present.after(reserva)) {
	                return false;
	            }else { 
	            	return true;
	            }
	    }	
}
