import React, { useState, useEffect } from 'react';
import { Plus, Home, Power } from 'lucide-react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
  FormGroup,
  CircularProgress
} from '@mui/material';

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [roomType, setRoomType] = useState('livingroom');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const devicesByType = {
    livingroom: [
      { id: 'tv', name: 'TV', power: 100 },
      { id: 'ac', name: 'Air Conditioner', power: 1500 },
      { id: 'light', name: 'Ceiling Light', power: 60 },
      { id: 'fan', name: 'Fan', power: 75 }
    ],
    bedroom: [
      { id: 'ac', name: 'Air Conditioner', power: 1500 },
      { id: 'light', name: 'Ceiling Light', power: 60 },
      { id: 'fan', name: 'Fan', power: 75 },
      { id: 'lamp', name: 'Bedside Lamp', power: 40 }
    ],
    kitchen: [
      { id: 'fridge', name: 'Refrigerator', power: 150 },
      { id: 'microwave', name: 'Microwave', power: 1100 },
      { id: 'light', name: 'Ceiling Light', power: 60 },
      { id: 'dishwasher', name: 'Dishwasher', power: 1800 }
    ]
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jagannath-45cbd-default-rtdb.firebaseio.com/users.json');
      const data = await response.json();
      if (data) {
        const roomsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
          devices: data[key].devices || [] // Ensure devices is always an array
        }));
        setRooms(roomsArray);
      } else {
        setRooms([]); // Set empty array if no data
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setRooms([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const addRoom = async (e) => {
    e.preventDefault();
    if (!roomName.trim() || selectedDevices.length === 0) return;

    const selectedDevicesDetails = selectedDevices.map(deviceId => {
      const device = devicesByType[roomType].find(d => d.id === deviceId);
      return {
        id: deviceId,
        name: device.name,
        power: device.power,
        status: 'off'
      };
    });

    const totalPower = selectedDevicesDetails.reduce((sum, device) => sum + device.power, 0);

    const newRoom = {
      name: roomName,
      type: roomType,
      powerConsumption: totalPower,
      devices: selectedDevicesDetails
    };

    try {
      const response = await fetch('https://jagannath-45cbd-default-rtdb.firebaseio.com/users.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRoom)
      });

      if (response.ok) {
        fetchRooms();
        setRoomName('');
        setSelectedDevices([]);
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  const handleDeviceToggle = (deviceId) => {
    setSelectedDevices(prev =>
      prev.includes(deviceId)
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f0f2f5', p: 4 }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Smart Home Dashboard
          </Typography>
          <Button
            variant="contained"
            startIcon={<Plus />}
            onClick={() => setIsFormOpen(true)}
          >
            Add Room
          </Button>
        </Box>

        {/* Rooms Grid */}
        <Grid container spacing={3}>
          {rooms && rooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 6 },
                  transition: 'box-shadow 0.3s'
                }}
                onClick={() => setSelectedRoom(room)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ p: 1, bgcolor: '#e3f2fd', borderRadius: 2 }}>
                      <Home color="#1976d2" />
                    </Box>
                    <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                      {room.type}
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ mb: 2 }}>{room.name}</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Box sx={{ bgcolor: '#e3f2fd', px: 1, py: 0.5, borderRadius: 10 }}>
                      <Typography variant="body2" color="primary">
                        {room.devices?.length || 0} Devices
                      </Typography>
                    </Box>
                    <Box sx={{ bgcolor: '#e8f5e9', px: 1, py: 0.5, borderRadius: 10 }}>
                      <Typography variant="body2" color="success.main">
                        Active
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Power size={16} />
                    <Typography variant="body2">
                      {room.powerConsumption || 0}W/h
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Devices:</Typography>
                    {room.devices && room.devices.map((device) => (
                      <Typography key={device.id} variant="body2" color="text.secondary">
                        {device.name} ({device.power}W)
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add Room Dialog */}
        <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Room</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={addRoom} sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              
              <FormControl fullWidth>
                <InputLabel>Room Type</InputLabel>
                <Select
                  value={roomType}
                  label="Room Type"
                  onChange={(e) => setRoomType(e.target.value)}
                >
                  <MenuItem value="livingroom">Living Room</MenuItem>
                  <MenuItem value="bedroom">Bedroom</MenuItem>
                  <MenuItem value="kitchen">Kitchen</MenuItem>
                </Select>
              </FormControl>

              <FormGroup>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>Select Devices</Typography>
                {devicesByType[roomType].map((device) => (
                  <FormControlLabel
                    key={device.id}
                    control={
                      <Checkbox
                        checked={selectedDevices.includes(device.id)}
                        onChange={() => handleDeviceToggle(device.id)}
                      />
                    }
                    label={`${device.name} (${device.power}W)`}
                  />
                ))}
              </FormGroup>

              <Button type="submit" variant="contained" fullWidth>
                Add Room
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        {/* Room Details Dialog */}
        <Dialog 
          open={!!selectedRoom} 
          onClose={() => setSelectedRoom(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{selectedRoom?.name}</DialogTitle>
          <DialogContent>
            {selectedRoom && (
              <Box sx={{ pt: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>Room Type</Typography>
                <Typography sx={{ mb: 3, textTransform: 'capitalize' }}>{selectedRoom.type}</Typography>
                
                <Typography variant="subtitle1" sx={{ mb: 1 }}>Power Consumption</Typography>
                <Typography sx={{ mb: 3 }}>{selectedRoom.powerConsumption || 0}W/h</Typography>
                
                <Typography variant="subtitle1" sx={{ mb: 1 }}>Devices</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {selectedRoom.devices && selectedRoom.devices.map((device) => (
                    <Box 
                      key={device.id} 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Typography>{device.name}</Typography>
                      <Typography color="text.secondary">{device.power}W</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Dashboard; 