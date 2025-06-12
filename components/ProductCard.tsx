import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Leaf, Award } from 'lucide-react-native';
import { Product } from '@/types/carbon';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  showComparison?: boolean;
}

const { width } = Dimensions.get('window');

export default function ProductCard({ product, onPress, showComparison = false }: ProductCardProps) {
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

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={[styles.rating, { backgroundColor: getRatingColor(product.carbonFootprint.rating) }]}>
          <Text style={styles.ratingText}>{product.carbonFootprint.rating}</Text>
        </View>
        {product.certifications.length > 0 && (
          <View style={styles.certificationsContainer}>
            <Award size={12} color="#F39C12" />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        
        <View style={styles.footprintContainer}>
          <Leaf size={16} color="#16A085" />
          <Text style={styles.footprintText}>{product.carbonFootprint.total} kg CO₂</Text>
        </View>

        {showComparison && product.alternatives && product.alternatives.length > 0 && (
          <LinearGradient
            colors={['#E8F5E8', '#F0F8F0']}
            style={styles.alternativeBadge}
          >
            <Text style={styles.alternativeText}>Better alternatives available</Text>
          </LinearGradient>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 120,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  rating: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  certificationsContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 6,
  },
  content: {
    padding: 16,
  },
  brand: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 12,
    lineHeight: 22,
  },
  footprintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  footprintText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#16A085',
    marginLeft: 6,
  },
  alternativeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  alternativeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: '#27AE60',
  },
});