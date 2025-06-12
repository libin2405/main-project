import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, RotateCcw, Maximize2, Trees, Cloud, Building2 } from 'lucide-react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function ARVisualization() {
  const [visualizationType, setVisualizationType] = useState<'trees' | 'volume' | 'building'>('trees');
  
  const carbonFootprint = 3.2; // Example value
  const treesNeeded = Math.round(carbonFootprint / 21.77 * 100) / 100;
  const volumeM3 = Math.round(carbonFootprint / 1.98 * 100) / 100;

  const visualizations = [
    {
      type: 'trees' as const,
      icon: Trees,
      title: 'Trees Needed',
      value: `${treesNeeded} trees`,
      description: 'to offset this carbon footprint annually',
      color: '#27AE60'
    },
    {
      type: 'volume' as const,
      icon: Cloud,
      title: 'CO₂ Volume',
      value: `${volumeM3} m³`,
      description: 'of carbon dioxide gas at standard conditions',
      color: '#3498DB'
    },
    {
      type: 'building' as const,
      icon: Building2,
      title: 'Building Equivalent',
      value: `${Math.round(carbonFootprint * 0.6)} sq ft`,
      description: 'office space carbon footprint per year',
      color: '#9B59B6'
    }
  ];

  const currentVisualization = visualizations.find(v => v.type === visualizationType)!;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AR Visualization</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Maximize2 size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.arView}>
        <LinearGradient
          colors={['#2C3E50', '#34495E']}
          style={styles.arBackground}
        >
          <View style={styles.arContent}>
            <View style={[styles.visualizationContainer, { borderColor: currentVisualization.color }]}>
              <currentVisualization.icon size={48} color={currentVisualization.color} />
              <Text style={[styles.visualizationValue, { color: currentVisualization.color }]}>
                {currentVisualization.value}
              </Text>
              <Text style={styles.visualizationDescription}>
                {currentVisualization.description}
              </Text>
            </View>

            <View style={styles.arInstructions}>
              <Text style={styles.instructionText}>
                Move your device to explore the visualization in 3D space
              </Text>
            </View>
          </View>

          {/* AR Grid Overlay */}
          <View style={styles.gridOverlay}>
            {Array.from({ length: 10 }).map((_, i) => (
              <View key={`h-${i}`} style={[styles.gridLine, styles.horizontalLine, { top: (i * height) / 10 }]} />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <View key={`v-${i}`} style={[styles.gridLine, styles.verticalLine, { left: (i * width) / 8 }]} />
            ))}
          </View>
        </LinearGradient>
      </View>

      <View style={styles.controls}>
        <Text style={styles.controlsTitle}>Visualization Type</Text>
        <View style={styles.visualizationTabs}>
          {visualizations.map((viz) => (
            <TouchableOpacity
              key={viz.type}
              style={[
                styles.visualizationTab,
                visualizationType === viz.type && styles.activeTab
              ]}
              onPress={() => setVisualizationType(viz.type)}
            >
              <viz.icon 
                size={20} 
                color={visualizationType === viz.type ? '#FFFFFF' : viz.color} 
              />
              <Text style={[
                styles.tabText,
                visualizationType === viz.type && styles.activeTabText
              ]}>
                {viz.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <RotateCcw size={20} color="#16A085" />
            <Text style={styles.actionButtonText}>Reset View</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          This AR visualization helps you understand the real-world impact of carbon emissions
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  arView: {
    flex: 1,
    position: 'relative',
  },
  arBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arContent: {
    alignItems: 'center',
    zIndex: 2,
  },
  visualizationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    borderWidth: 2,
    padding: 32,
    alignItems: 'center',
    marginBottom: 40,
    backdropFilter: 'blur(10px)',
  },
  visualizationValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    marginTop: 16,
    marginBottom: 8,
  },
  visualizationDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    maxWidth: 200,
  },
  arInstructions: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  instructionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.2,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: '#16A085',
  },
  horizontalLine: {
    width: '100%',
    height: 1,
  },
  verticalLine: {
    height: '100%',
    width: 1,
  },
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  controlsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  visualizationTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  visualizationTab: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    minWidth: 80,
  },
  activeTab: {
    backgroundColor: '#16A085',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 6,
    textAlign: 'center',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  actionButtons: {
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 160, 133, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#16A085',
  },
  actionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#16A085',
    marginLeft: 8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 18,
  },
});