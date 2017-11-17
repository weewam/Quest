function degreesToRadians(degrees) {
  return degrees * Math.PI / 180
}

export function distanceFromPhone(phoneLocation, eventLocation) {
  var earthRadiusKm = 6371
  var dLat = degreesToRadians(
    phoneLocation.lat - eventLocation.lat
  )
  var dLon = degreesToRadians(
    phoneLocation.long - eventLocation.long
  )

  lat1 = degreesToRadians(phoneLocation.lat)
  lat2 = degreesToRadians(eventLocation.lat)

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return earthRadiusKm * c
}

