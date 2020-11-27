package br.com.myreserve.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import br.com.myreserve.entities.Reserva;

public interface ReservaRepository extends CrudRepository<Reserva, Integer>{
	

	@Query("select r from Reserva r  where r.fk_usuario = :idUser")
	Iterable<Reserva> findAllByUser(@Param("idUser") Integer idUser);
	
	@Query("select r from Reserva r where r.fk_horario = :idHorario")
	Reserva selectByFkHorario(@Param("idHorario") Integer idHorario);

}
