export function createOptionsDetailMateriel(details = []) {
  if (details[0]) {
    return details.map((detail) => {
      return { id: detail.id, value: detail.type }
    })
  }
}

export function createOptionsUser(users = []) {
  if (users[0]) {
    return users.map((user) => {
      return { id: user.id, value: `${user.nom} ${user.prenom}` }
    })
  }
}

export function createOptionsTechnicien(techniciens = []) {
  if (techniciens[0]) {
    return techniciens.map((technicien) => {
      return {
        id: technicien.id,
        value: `${technicien.nom} ${technicien.prenom}`
      }
    })
  }
}
