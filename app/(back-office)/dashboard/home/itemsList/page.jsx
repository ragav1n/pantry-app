'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Stack } from '@mui/material';
import { firestore } from '../firebase'; // Adjust the path if necessary
import { collection, getDocs } from 'firebase/firestore';
import jsPDF from 'jspdf';

export default function ItemsList() {
  const [items, setItems] = useState([]);

  // Function to fetch and set items from Firestore
  const fetchItems = async () => {
    const itemsRef = collection(firestore, 'pantry');
    const snapshot = await getDocs(itemsRef);
    const itemsList = snapshot.docs.map(doc => ({
      name: doc.id,
      quantity: doc.data().quantity || 0
    }));
    setItems(itemsList);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Function to generate and download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Pantry Items List', 10, 10);
    let y = 20;

    items.forEach((item) => {
      doc.text(`${item.name}: ${item.quantity}`, 10, y);
      y += 10;
    });

    doc.save('pantry-items-list.pdf');
  };

  return (
    <Box
      width="85vw"
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding={25}
    >
      <Typography variant="h4" marginBottom={2}>
        List of Pantry Items
      </Typography>
      {items.length === 0 ? (
        <Typography>No items found.</Typography>
      ) : (
        <Box width="50%" maxWidth="800px">
          {items.map((item) => (
            <Card key={item.name} variant="outlined" sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>Quantity: {item.quantity}</Typography>
              </CardContent>
            </Card>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={downloadPDF}
            sx={{ marginTop: 2 }}
          >
            Download PDF
          </Button>
        </Box>
      )}
    </Box>
  );
}
