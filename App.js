import React, {useState, useEffect} from 'react'
import './App.css'

function App() {
  // State to hold list of services
  const [services, setServices] = useState([])

  // State for new service form
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
  })

  // State for edit service
  const [editService, setEditService] = useState(null)

  // Handle form input changes
  const handleInputChange = e => {
    setNewService({
      ...newService,
      [e.target.name]: e.target.value,
    })
  }

  // Add a new service
  const addService = e => {
    e.preventDefault()
    if (newService.name && newService.description && newService.price) {
      setServices([...services, newService])
      setNewService({name: '', description: '', price: ''})
    } else {
      alert('All fields are required.')
    }
  }

  // Update an existing service
  const updateService = e => {
    e.preventDefault()
    if (editService.name && editService.description && editService.price) {
      setServices(
        services.map((service, index) =>
          index === editService.index ? editService : service,
        ),
      )
      setEditService(null)
    } else {
      alert('All fields are required for editing.')
    }
  }

  // Delete a service
  const deleteService = index => {
    setServices(services.filter((_, i) => i !== index))
  }

  // Handle editing a service
  const handleEditClick = index => {
    setEditService({...services[index], index})
  }

  return (
    <div className="container">
      <h1>Healthcare Services</h1>

      <ul className="list-group">
        {services.length === 0 ? (
          <p>No services available.</p>
        ) : (
          services.map((service, index) => (
            <li key={index} className="list-group-item">
              <h4>{service.name}</h4>
              <p>{service.description}</p>
              <strong>Price: ${service.price}</strong>
              <button
                className="btn btn-warning"
                onClick={() => handleEditClick(index)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteService(index)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>

      {/* Add new service form */}
      <h2>{editService ? 'Edit Service' : 'Add New Service'}</h2>
      <form onSubmit={editService ? updateService : addService}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={editService ? editService.name : newService.name}
            onChange={
              editService
                ? e => setEditService({...editService, name: e.target.value})
                : handleInputChange
            }
            placeholder="Service Name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="description"
            value={
              editService ? editService.description : newService.description
            }
            onChange={
              editService
                ? e =>
                    setEditService({
                      ...editService,
                      description: e.target.value,
                    })
                : handleInputChange
            }
            placeholder="Service Description"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="price"
            value={editService ? editService.price : newService.price}
            onChange={
              editService
                ? e => setEditService({...editService, price: e.target.value})
                : handleInputChange
            }
            placeholder="Service Price"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editService ? 'Update Service' : 'Add Service'}
        </button>
      </form>
    </div>
  )
}

export default App
