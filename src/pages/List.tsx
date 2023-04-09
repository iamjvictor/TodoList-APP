import React, { useEffect, useState } from 'react'
import { Text, View,  Button, TextInput, StyleSheet } from 'react-native'
import { FIRESTORE_DB } from '../config/firebaseconfig';
import { addDoc, collection } from 'firebase/firestore';

const List = ({ navigation}: any) =>{

const [tasks, setTasks] = useState<any[]>([]);
const [task, setTask] = useState('');

useEffect (() => {
  
}, []);

const addTodo = async () => {
const doc = await addDoc(collection(FIRESTORE_DB, 'Task'), {title: task, done: false})
setTask('');
};


 return(
      <View style={styles.container}>
        <View style={styles.form}>
            <TextInput style={styles.input} placeholder='Add a new Task' onChangeText={(text: string) => setTask(text)} value={task}/>
            <Button onPress={() => addTodo()} title='ADD' disabled={task === ''}/>
        </View>
        <Button onPress={() => navigation.navigate('Details')} title='Details'/>
        
      </View>
  )
}


export default List;



const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20, 
    
  },

  form: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:20,
  },

  input:{
    flex:1,
    borderRadius:3,
    borderWidth:1,
    height: 40,
    marginRight:10,
    
  },

  button:{
    borderRadius:10,
    
  }


});