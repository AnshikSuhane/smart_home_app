import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Switch,
  Grid,
  LinearProgress,
} from '@mui/material';
import { ArrowLeft, Power, Thermometer, Droplets } from 'lucide-react';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for devices
  const devices = [
    {
      id: '1',
      name: 'Smart Light',
      type: 'Light',
      status: true,
      powerUsage: 15,
      icon: <Power className="text-blue-500" />,
    },
    {
      id: '2',
      name: 'AC Unit',
      type: 'Climate',
      status: true,
      powerUsage: 1200,
      icon: <Thermometer className="text-red-500" />,
    },
    {
      id: '3',
      name: 'Humidifier',
      type: 'Climate',
      status: false,
      powerUsage: 45,
      icon: <Droplets className="text-green-500" />,
    },
  ];

  const totalPowerUsage = devices.reduce((acc, device) => acc + (device.status ? device.powerUsage : 0), 0);
  const maxPowerLimit = 2000;

  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <Box className="max-w-6xl mx-auto">
        {/* Header */}
        <Box className="mb-8 flex items-center gap-4">
          <IconButton onClick={() => navigate('/dashboard')} className="bg-white">
            <ArrowLeft />
          </IconButton>
          <Typography variant="h4" className="font-bold">
            Room Details
          </Typography>
        </Box>

        {/* Power Usage Card */}
        <Card className="mb-8">
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Power Consumption
            </Typography>
            <Box className="mb-2 flex justify-between">
              <Typography variant="body2" color="text.secondary">
                Current Usage: {totalPowerUsage}W
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Limit: {maxPowerLimit}W
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(totalPowerUsage / maxPowerLimit) * 100}
              className="h-2 rounded-full"
            />
          </CardContent>
        </Card>

        {/* Devices Grid */}
        <Grid container spacing={4}>
          {devices.map((device) => (
            <Grid item xs={12} md={6} lg={4} key={device.id}>
              <Card>
                <CardContent>
                  <Box className="flex items-center justify-between mb-4">
                    <Box className="flex items-center gap-3">
                      <Box className="p-2 bg-gray-100 rounded-lg">
                        {device.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6">{device.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {device.type}
                        </Typography>
                      </Box>
                    </Box>
                    <Switch checked={device.status} />
                  </Box>
                  <Box className="flex items-center gap-2 text-gray-600">
                    <Power size={16} />
                    <Typography variant="body2">
                      {device.powerUsage}W/h
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default RoomDetail;