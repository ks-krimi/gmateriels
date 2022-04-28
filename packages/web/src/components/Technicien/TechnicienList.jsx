import Card from './Card'

function TechnicienList({ techniciens }) {
  return (
    <>
      {techniciens.map((technicien, index) => (
        <Card key={index} technicien={technicien} />
      ))}
    </>
  )
}

export default TechnicienList
