import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UserHome = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [user, navigate])

  return (
    <div>UserHome</div>
  )
}

export default UserHome