import "./Filtro.css"

export const Filtro = () => {

  return(
    <aside className="filtro">
      <h3>Filtrar por</h3>
      <form>
        <div>
          <label htmlFor="precio">Precio</label>
          <div className="precio">
            <input type="number" name="precio-min"/>
            <span>-</span>
            <input type="number" name="precio-max"/>
          </div>
        </div>
        <div>
          <label htmlFor="val">Valoracio</label>
          <div className="val">
            <input type="number" name="val-min" id="val-min" min={0} max={5}/>
            <span>-</span>
            <input type="number" name="val-max" id="val-max" min={0} max={5}/>
          </div>
        </div>
        <input type="submit"  />
      </form>
    </aside>
  )
}