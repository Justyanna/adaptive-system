
const Component = ({component}) => {
    return <> <br></br>  {component.type === 'text' && (
        <p>
          {component.contents}
        </p>
      )}{component.type === 'img' && (
        <p>
          <img src='tmp' id={`img-${component.contents}`} />
        </p>
      )}
      {component.type === 'video' && (
        <p>
          <video src='tmp' id={`video-${component.contents}`} />
        </p>
      )}
      {component.type !== 'text' && component.type !== 'img' && component.type !== 'video' && (
        <p>Element wymaga implementacji</p>
      )}
            <br></br>
    </>
}

export default Component