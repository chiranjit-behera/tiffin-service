import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import API from '../api/api';

export default function ZoneModal({ open, handleClose, refreshData, editZone }) {
  const [formData, setFormData] = useState({ name: '', pincode: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editZone) {
      setFormData({
        name: editZone.name || '',
        pincode: editZone.pincode.join(', ')
      });
    } else {
      setFormData({ name: '', pincode: '' });
    }
  }, [editZone]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (loading) return;

    const pincodeArray = formData.pincode
      .split(',')
      .map(pin => pin.trim())
      .filter(pin => pin);

    if (!formData.name.trim() || pincodeArray.length === 0) {
      alert("Zone name and at least one valid pincode are required.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name.trim(),
        pincode: pincodeArray
      };

      if (editZone && editZone._id) {
        await API.put(`/admin/zones/${editZone._id}`, payload);
      } else {
        await API.post('/admin/zones', payload);
      }

      refreshData();
      handleClose();
    } catch (err) {
      console.error(err);
      alert('Failed to save zone');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editZone ? 'Edit' : 'Add'} Delivery Zone</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="zoneName">
            <Form.Label>Zone Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter zone name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="zonePincode">
            <Form.Label>Pincodes (comma separated)</Form.Label>
            <Form.Control
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Ex: 560001, 560002"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <><Spinner animation="border" size="sm" /> Saving...</> : editZone ? 'Update' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
