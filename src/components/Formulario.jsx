import { useState, useEffect } from 'react'
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
    const [ nombre, setNombre] = useState('');
    const [ propietario, setPropietario] = useState('');
    const [ email, setEmail] = useState('');
    const [ fecha, setFecha] = useState('');
    const [ sintomas, setSintomas] = useState('');

   const [error, setError] = useState(false); 

   useEffect(() =>{
     if( Object.keys(paciente).length > 0 ) {
       setNombre(paciente.nombre)
       setPropietario(paciente.propietario)
       setEmail(paciente.email)
       setFecha(paciente.fecha)
       setSintomas(paciente.sintomas)
     }

   },[paciente])

   const generarId = () => {
     const random = Math.random().toString(36).substring(2);
     const fecha = Date.now().toString(36);

     return random + fecha

   }

    const handeleSubmit = (evt) => {
      evt.preventDefault();

      // Validacion del formulario
      if([ nombre, propietario, email, fecha, sintomas ].includes('')) {
        setError(true)
        return;
      }

      setError(false)

      // Objeto de Pacientes
      const objetoPaciente = {
        nombre,
        propietario,
        email,
        fecha,
        sintomas
      }

      if(paciente.id) {
        // Ediatando el registro
        objetoPaciente.id = paciente.id;
        const pacienteActulizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente: pacienteState )

        setPacientes(pacienteActulizados)
        setPaciente({})

      } else{
        // Nuevo registro
        objetoPaciente.id = generarId();
        setPacientes([...pacientes, objetoPaciente]);
      }


      // Reiniciar al form
      setNombre('');
      setPropietario('');
      setEmail('');
      setFecha('');
      setSintomas('');

    }


  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimineto Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold ">Administralos</span>
      </p>

      <form onSubmit={ handeleSubmit }
      className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
        <div className="mb-5">
          { error && <Error><p>Todos los campos son ablilgatorios</p></Error>}
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="mascota"
          >
            Nombre Mascota
          </label>

          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange = { (evt) => setNombre(evt.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="propietario"
          >
            Nombre Propietario
          </label>

          <input
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange = { (evt) => setPropietario(evt.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="Email"
          >
            Email
          </label>

          <input
            id="Email"
            type="email"
            placeholder="Email Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange = { (evt) => setEmail(evt.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="alta"
          >
            Alta
          </label>

          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange = { (evt) => setFecha(evt.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="sintomas"
          >
            Sintomas
          </label>

          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-r-md"
            placeholder="Describi los sintomas"
            value={sintomas}
            onChange = { (evt) => setSintomas(evt.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente' }
        />
      </form>
    </div>
  );
};

export default Formulario;
