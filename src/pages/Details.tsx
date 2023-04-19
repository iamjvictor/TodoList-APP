import React, { useEffect, useState } from 'react'
import { Text, View,  Button, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { FIRESTORE_DB } from '../config/firebaseconfig';
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';

import WeatherAPI from '../components/WeatherAPI';

export interface Task {
  title: string;
  done: boolean;
  id: string;
  createDate: number;
};

export default function Details() {
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
  
  const renderTask = ({item}: any) =>{

    const ref = doc(FIRESTORE_DB, `Task/${item.id}`);  
    
    return(
       
        <View style={styles.taskContainer}>       
            <Text style={styles.taskTitle}>{item.title}</Text>
            <View style={styles.taskInfo}>
              <Text style={styles.infoTitle}>Criado em:  {item.createDate}</Text>
              <Text style={styles.infoTitle}>Cocluido em:  {item.checkDate}</Text>
            </View>     
          
        </View> 
      )
  }
  
  
  return(
        
        <View style={styles.container}>
          <WeatherAPI/>
          <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={
            (task: Task) => task.id
          }
          />
       </View>

    
  )
}



const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10, 
    marginTop: 15
    
  },



  taskContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:5,
    backgroundColor:"#B0C4DE",
    padding:2,
    
  
  }, 

  taskInfo:{
    flexDirection: 'column',
    marginLeft:20,
    marginBottom:0,
  },

  infoTitle:{
    fontSize:10,
  },

  taskTitle:{
    paddingHorizontal:5,
    fontWeight: "bold",
    color:"black",
    textTransform:"uppercase",
    width:"40%",
    fontSize:16,

  },

  task:{
    flexDirection: 'row',
    alignItems: 'center',
    flex:1,
  }


});