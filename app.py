import streamlit as st
import pandas as pd
import plotly.express as px
import csv
import time
lista=[]
with open('data.csv', mode ='r')as file:
# reading the CSV file
    csvFile = csv.reader(file)
# displaying the contents of the CSV file
    for lines in csvFile:
                    if lines!=["hora","precio"]:
                        lista.append(lines[1])


st.write("""
# Hola Yay@

""")
 
with st.sidebar:
     st.title('Tu Lavavajillas')
     st.info('Qué toca hoy')
     choice = st.radio('Menú', ['precios', 'Aparatos', 'Programas', 'Download'])
if choice == 'precios':
     st.write("Estos son los precios")
     st.title('Gráfica de precios')
     df=pd.read_csv('data.csv')
     fig = px.line(df, x="hora", y="precio", title='Precios de hoy')  #I have used plotly.express so I can see the price by passing the cursor over the graps
     st.plotly_chart(fig)
     
if choice == 'Aparatos':
     col1, col2, col3 = st.columns([2,3,1])
     boton='lavavajillas'
     on = col1.toggle(boton)
     if on:
          
          col2.write(":white_check_mark:")
     else: 
           
          col2.write(":x:")
     st.write('Lavadora')
     st.write('Frigorífico')
     st.write('Secadora')
     container_2 = st.empty()
     button_A = container_2.button('Encender')
     if button_A:
          container_2.empty()
          button_B = container_2.button('Apagar')
if choice== "Programas":
        st.subheader('Escoge el programa')
        col1, col2, col3 = st.columns([3,3,3])
        on=col1.toggle("económico")
        if on:
          with st.empty():
               for secs in range(1200,0,-1):
                    mm, ss = secs//60, secs%60
                    st.metric("⏳ Quedan: ", f"{mm:02d}:{ss:02d}")
                    time.sleep(1)
                    st.write("✔️ ¡terminado!")
        on1= col2.toggle("a fondo")
        if on1:
              with col2.empty():
               for secs in range(1800,0,-1):
                    mm, ss = secs//60, secs%60
                    st.metric("⏳ Quedan: ", f"{mm:02d}:{ss:02d}")
                    time.sleep(1)
                    st.write("✔️ ¡terminado!")
        on2= col3.toggle("rápido")
        if on2:
              with col3.empty():
               for secs in range(600,0,-1):
                    mm, ss = secs//60, secs%60
                    st.metric("⏳ Quedan: ", f"{mm:02d}:{ss:02d}")
                    time.sleep(1)
                    st.write("✔️ ¡terminado!")
          

          


          
 
      