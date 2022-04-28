import Card from './Card'

function MaterielList({ materiels, isLibre = true, isEnPanne = false }) {
  const libre = materiels.filter(
    (materiel) => materiel.user === null && materiel.status === 'EN_MARCHE'
  )
  const occuper = materiels.filter(
    (materiel) => materiel.user !== null && materiel.status === 'EN_MARCHE'
  )
  const enPanne = materiels.filter((materiel) => materiel.status === 'EN_PANNE')

  const list = isEnPanne ? enPanne : isLibre ? libre : occuper

  return (
    <>
      {list.map((materiel, index) => (
        <Card key={index} materiel={materiel} />
      ))}
    </>
  )
}

export default MaterielList
