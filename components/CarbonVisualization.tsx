import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trees, Cloud } from 'lucide-react-native';

interface CarbonVisualizationProps {
  carbonFootprint: number;
  rating: 'A' | 'B' | 'C' | 'D' | 'E';
}

const { width } = Dimensions.get('window');

export default function CarbonVisualization({ carbonFootprint, rating }: CarbonVisualizationProps) {
  const treesNeeded = Math.round(carbonFootprint / 21.77 * 100) / 100; // 21.77kg CO2 per tree per year
  const volumeM3 = Math.round(carbonFootprint / 1.98 * 100) / 100; // 1.98kg per m³ at STP

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'A': return '#27AE60';
      case 'B': return '#F39C12';
      case 'C': return '#E67E22';
      case 'D': return '#E74C3C';
      case 'E': return '#C0392B';
      default: return '#7F8C8D';
    }
  };

  const getRatingGradient = (rating: string) => {
    switch (rating) {
      case 'A': return ['#27AE60', '#2ECC71'];
      case 'B': return ['#F39C12', '#F1C40F'];
      case 'C': return ['#E67E22', '#F39C12'];
      case 'D': return ['#E74C3C', '#EC7063'];
      case 'E': return ['#C0392B', '#E74C3C'];
      default: return ['#7F8C8D', '#95A5A6'];
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={getRatingGradient(rating)}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.ratingText}>Rating: {rating}</Text>
        <Text style={styles.carbonText}>{carbonFootprint} kg CO₂</Text>
      </LinearGradient>

      <View style={styles.visualizations}>
        <View style={styles.visualItem}>
          <Trees size={32} color="#27AE60" />
          <Text style={styles.visualLabel}>Trees Needed</Text>
          <Text style={styles.visualValue}>{treesNeeded}</Text>
          <Text style={styles.visualUnit}>to offset annually</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.visualItem}>
          <Cloud size={32} color="#3498DB" />
          <Text style={styles.visualLabel}>CO₂ Volume</Text>
          <Text style={styles.visualValue}>{volumeM3}</Text>
          <Text style={styles.visualUnit}>cubic meters</Text>
        </View>
      </View>

      <View style={styles.impactBar}>
        <Text style={styles.impactLabel}>Environmental Impact</Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${Math.min((carbonFootprint / 5) * 100, 100)}%`,
                backgroundColor: getRatingColor(rating)
              }
            ]} 
          />
        </View>
        <View style={styles.impactLabels}>
          <Text style={styles.lowImpact}>Low</Text>
          <Text style={styles.highImpact}>High</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  carbonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  visualizations: {
    flexDirection: 'row',
    padding: 24,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  visualItem: {
    alignItems: 'center',
    flex: 1,
  },
  divider: {
    width: 1,
    height: 60,
    backgroundColor: '#E8E8E8',
    marginHorizontal: 20,
  },
  visualLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 8,
    textAlign: 'center',
  },
  visualValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#2C3E50',
    marginTop: 4,
  },
  visualUnit: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: '#95A5A6',
    textAlign: 'center',
    marginTop: 2,
  },
  impactBar: {
    padding: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopWidth: 1,
    borderTopColor: '#F8F9FA',
  },
  impactLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 12,
    textAlign: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  impactLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  lowImpact: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#27AE60',
  },
  highImpact: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#E74C3C',
  },
});