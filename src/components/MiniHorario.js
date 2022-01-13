export default function MiniHorario({ horario }) {
	return (
		<>
			{	horario &&
				horario.map(hora => (
					<div className="d-flex" key={hora._id}>
						<div className="d-flex rounded-2 mb-1" style={{ color: "white", width: "30px", backgroundColor: "gray", justifyContent: "center" }}>
							{hora.dia.substring(0, 2).toUpperCase()}
						</div>
						<div>
							<span>{`${hora.horaInicio}-${hora.horaFin}`}</span>
						</div>
					</div>
				))
			}
		</>
	)
}