
const Component = ({component}) => {
    return <> <br></br> {component.type =='text' ? component.contents  :   <p>
    <img src='tmp' id={`img-${component.contents}`} />
  </p>}
            <br></br>
    </>
}

export default Component