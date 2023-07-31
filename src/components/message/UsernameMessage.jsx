
function UsernameMessage({username, colorUsername}) {
  return (
    <p className="username" style={{color:colorUsername }}>
        {username.length < 1 ? "username" : username}<span style={{color:"white"}}>:</span>
        
    </p>
  )
}

export default UsernameMessage