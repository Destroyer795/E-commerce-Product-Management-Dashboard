import { Box, Container, VStack, Heading, useColorModeValue, Input, Button, useToast, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  }); //it is an object with name price and image

  const toast = useToast();
  const { createProduct } = useProductStore(); //extracting the function
  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error!!", //the "title" thing does not matter it seems
        description: message,
        status: "error",
        duration: 3000, //3 secs duration
        isClosable: true //close the toast choice
      })
    }
    else {
      toast({
        title: "Suzzess!!", //the "title" thing does not matter it seems
        description: message,
        status: "success",
        duration: 3000, //3 secs duration
        isClosable: true //close the toast choice
      })
    }
    setNewProduct({ name: "", price: "", image: "" }); //to reset the input thing after creation
  };

  return (
    //this container.sm also came from the documentation..
    <Container maxW={"container.sm"}> 
      <VStack
        spacing={8}
      >
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} my={10}>
          <Text
            fontSize={{base: "22", sm: "28"}}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
          >
            Create Product Bro
          </Text>
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder='Price'
              name='price'
              type='number'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder='Image URL'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />

            <Button colorScheme='blue' onClick={handleAddProduct} w={'full'}>
              Add Product bro
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage
