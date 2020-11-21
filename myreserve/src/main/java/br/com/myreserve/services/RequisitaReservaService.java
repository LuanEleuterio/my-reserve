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
		
	public final static SimpleDateFormat parser = new SimpleDateFormat("HH:mm:ss");
	
	@Bean
	public static boolean checkInfoReserva(Horario horario, Integer qtdPessoas, String atNow) throws Exception{
		if(qtdPessoas <= horario.getQtd_pessoa_vaga() && qtdPessoas <= horario.getVagas_at_moment() && checkHour(atNow, horario.getHorario_de())) {
			return true;
		}
		return false;
	}
	
	@Bean
	 public static boolean checkHour(String timeAtNow, String timeReserva) throws java.text.ParseException{
	            Date present = parser.parse(timeAtNow);
	            Date reserva = parser.parse(timeReserva);
	            if (present.after(reserva)) {
	                return false;
	            }else { 
	            	return true;
	            }
	    }	
}
