'use client';
import React from 'react';
import { Box, Grid, Modal, Typography, TextField, Button, Card, CardContent, CardActions, Stack } from '@mui/material';
import { firestore } from '../../../firebase'; // Ensure this path is correct based on where you place firebase.js
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link for navigation

export default function Page() {
  const [pantry, setPantry] = useState([]);
  const [filteredPantry, setFilteredPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const updatePantry = async () => {
    const pantryRef = collection(firestore, 'pantry');
    const snapshot = await getDocs(pantryRef);
    const pantryList = [];
    snapshot.forEach((doc) => {
      pantryList.push({ name: doc.id, quantity: doc.data().quantity || 0 });
    });
    setPantry(pantryList);
    setFilteredPantry(pantryList); // Initialize the filtered pantry list
  };

  useEffect(() => {
    updatePantry();
  }, []);

  useEffect(() => {
    // Filter pantry items based on the search query
    const lowercasedQuery = searchQuery.toLowerCase();
    const filteredItems = pantry.filter(item => item.name.toLowerCase().includes(lowercasedQuery));
    setFilteredPantry(filteredItems);
  }, [searchQuery, pantry]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addItem(itemName);
    }
  };

  const addItem = async (name) => {
    if (name.trim() !== '') {
      const docRef = doc(collection(firestore, 'pantry'), name);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentQuantity = (docSnap.data().quantity || 0);
        await setDoc(docRef, { quantity: currentQuantity + 1 }, { merge: true });
      } else {
        await setDoc(docRef, { quantity: 1 });
      }

      setItemName(''); // Clear the text box
      handleClose(); // Close the modal
      updatePantry(); // Update the pantry list
    }
  };

  const removeItem = async (name) => {
    const docRef = doc(collection(firestore, 'pantry'), name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const currentQuantity = (docSnap.data().quantity || 0);
      if (currentQuantity > 1) {
        await setDoc(docRef, { quantity: currentQuantity - 1 }, { merge: true });
      } else {
        await deleteDoc(docRef);
      }
      updatePantry();
    }
  };

  return (
    <Box
      width="85vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      boxShadow={5}
    >
      <Box border="1px solid #333" width="90%" maxWidth="1200px" boxSizing="border-box" borderRadius="8px" overflow="hidden">
        <Box
          bgcolor="#1D2951"
          padding={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          boxSizing="border-box"
        >
          <Typography variant="h2" color="white"  textAlign="center" marginBottom={1}>
            Pantry Items
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: '100%', maxWidth: '500px', marginBottom: 2, '& .MuiInputBase-input::placeholder': { color: 'white', },}}
          />
        </Box>
        <Box padding={2} boxSizing="border-box">
          <Grid container spacing={2}>
            {filteredPantry.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.name}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="#333" textAlign="center" fontWeight="bold">
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </Typography>
                    <Typography variant="h6" color="#333" textAlign="center" fontWeight="bold">
                      {item.quantity}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" onClick={() => addItem(item.name)} fullWidth sx={{ backgroundColor: 'ForestGreen', color: 'white' }}>
                      Add
                    </Button>
                    <Button variant="contained" onClick={() => removeItem(item.name)} fullWidth sx={{ backgroundColor: 'Crimson', color: 'white' }}>
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="20px"
        >
          <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: 'olivedrab', color: 'white' }}>
            Add Item
          </Button>
        </Box>

        {/* New Button to navigate to the list page */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="20px"
        >
          <Link href="/dashboard/home/itemsList/" passHref>
            <Button variant="contained" sx={{ backgroundColor: 'darkcyan', color: 'white' }}>
              List of Items Added
            </Button>
          </Link>
        </Box>

        <Modal open={open} onClose={handleClose}>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            width={400}
            bgcolor="white"
            border="2px solid #000"
            boxShadow={24}
            p={3}
            display="flex"
            flexDirection="column"
            gap={3}
            sx={{
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Typography variant="h6">Add Item</Typography>
            <Stack width="100%" direction="row" spacing={2}>
              <TextField
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Stack>
            <Button variant="contained" color="primary" onClick={() => addItem(itemName)}>
              Add
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
