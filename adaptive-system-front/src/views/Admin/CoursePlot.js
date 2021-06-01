import styles from './Admin.module.css'

const CoursePlot = ({ xAxis, yAxis}) => {
  if (!xAxis || !yAxis) return <></>
  return (
    <>
      <div class={styles['background']}>
          <div class={styles['dot']} style={{"--axis-x": xAxis, "--axis-y":yAxis}}/>
      </div>
    </>
  )
}

export default CoursePlot
