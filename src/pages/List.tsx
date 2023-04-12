import React, { useEffect, useState } from 'react'
import { Text, View,  Button, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { FIRESTORE_DB } from '../config/firebaseconfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';

export interface Task {
  title: string;
  done: boolean;
  id: string;
};


const List = ({ navigation}: any) =>{

const [tasks, setTasks] = useState<Task[]>([]);
const [task, setTask] = useState('');

useEffect (() => {
  const taskRef = collection(FIRESTORE_DB, 'Task');

  let subscriber = onSnapshot(taskRef, {
    next: (snapshot) => {
      const tasks: Task[] = [];
      snapshot.docs.forEach((doc) => {
        
        tasks.push({
          id: doc.id,
          ...doc.data()
        } as Task)

      });

      setTasks(tasks)
    },

  });

  return () => subscriber();
}, []);

const addTodo = async () => {
const doc = await addDoc(collection(FIRESTORE_DB, 'Task'), {title: task, done: false})
setTask('');
};

const renderTask = ({item}: any) =>{

  const ref = doc(FIRESTORE_DB, `Task/${item.id}`);

  const doneTask = async () => {
    updateDoc(ref, { done: !item.done});
    
  }

  const deleteTask =async () => {
    deleteDoc(ref);
  }
  return(
    
    <View style={styles.taskContainer}>
      <TouchableOpacity style={styles.task} onPress={doneTask}>
        {item.done && <AntDesign name="checksquare" size={24} color="green" />}
        {!item.done && <AntDesign name="closesquareo" size={24} color="black" />}
        <Text style={styles.taskTitle}>{item.title}</Text>
      </TouchableOpacity>
      <Ionicons onPress={deleteTask} name="trash-bin" size={24} color="black" />
    </View>
  )
}


 return(
      <View style={styles.container}>
        <View style={styles.form}>
            <TextInput style={styles.input} placeholder='Add a new Task' onChangeText={(text: string) => setTask(text)} value={task}/>
            <Button onPress={() => addTodo()} title='ADD' disabled={task === ''}/>
        </View>

        {tasks.length > 0 && (
            <View>
             <FlatList
             data={tasks}
             renderItem={renderTask}
             keyExtractor={
              (task: Task) => task.id
             }
             />
           </View>
   
        )}
       



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
    padding:10,
    
  },

  button:{
    borderRadius:10,
    
  },

  taskContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:5,
    backgroundColor:"#B0C4DE",
    padding:10,
  
  }, 

  taskTitle:{
    paddingHorizontal:5,
    fontWeight: "bold",
    color:"black"
  },

  task:{
    flexDirection: 'row',
    alignItems: 'center',
    flex:1,
  }


});