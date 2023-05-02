export class Rubro{
  id = ""
  nombre = ""
  final = false
  activo = true
  children: Array<Rubro> = []

  constructor(id: string, nombre: string, final: boolean, activo: boolean, children: Array<Rubro>){
    this.id = id
    this.nombre = nombre
    this.final = final
    this.activo = activo
    this.children = children
  }
}
