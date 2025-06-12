import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Share2, Bookmark, Eye, Recycle, Truck, Package, Factory } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import CarbonVisualization from '@/components/CarbonVisualization';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/data/mockData';

const { width } = Dimensions.get('window');

export default function ProductDetails() {
  const { productId } = useLocalSearchParams();
  const product = mockProducts.find(p => p.id === productId) || mockProducts[0];

  const impactBreakdown = [
    {
      icon: Factory,
      label: 'Manufacturing',
      value: product.carbonFootprint.manufacturing,
      color: '#E74C3C',
      description: 'Production and processing'
    },
    {
      icon: Truck,
      label: 'Transportation',
      value: product.carbonFootprint.transportation,
      color: '#F39C12',
      description: 'Shipping and logistics'
    },
    {
      icon: Package,
      label: 'Packaging',
      value: product.carbonFootprint.packaging,
      color: '#9B59B6',
      description: 'Materials and wrapping'
    },
    {
      icon: Recycle,
      label: 'Disposal',
      value: product.carbonFootprint.disposal,
      color: '#16A085',
      description: 'End-of-life processing'
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Analysis</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Share2 size={20} color="#2C3E50" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Bookmark size={20} color="#2C3E50" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.productHeader}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.brand}>{product.brand}</Text>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.category}>{product.category}</Text>
            
            {product.certifications.length > 0 && (
              <View style={styles.certifications}>
                {product.certifications.map((cert, index) => (
                  <View key={index} style={styles.certificationBadge}>
                    <Text style={styles.certificationText}>{cert}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        <CarbonVisualization 
          carbonFootprint={product.carbonFootprint.total}
          rating={product.carbonFootprint.rating}
        />

        <View style={styles.breakdownSection}>
          <Text style={styles.sectionTitle}>Carbon Footprint Breakdown</Text>
          <View style={styles.breakdownGrid}>
            {impactBreakdown.map((item, index) => (
              <View key={index} style={styles.breakdownItem}>
                <LinearGradient
                  colors={[item.color, `${item.color}CC`]}
                  style={styles.breakdownIcon}
                >
                  <item.icon size={20} color="#FFFFFF" />
                </LinearGradient>
                <Text style={styles.breakdownLabel}>{item.label}</Text>
                <Text style={styles.breakdownValue}>{item.value}kg CO₂</Text>
                <Text style={styles.breakdownDescription}>{item.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {product.alternatives && product.alternatives.length > 0 && (
          <View style={styles.alternativesSection}>
            <View style={styles.alternativesHeader}>
              <Text style={styles.sectionTitle}>Eco-Friendly Alternatives</Text>
              <Text style={styles.alternativesSubtitle}>
                Better choices for the environment
              </Text>
            </View>
            {product.alternatives.map((alternative) => (
              <ProductCard
                key={alternative.id}
                product={{
                  ...alternative,
                  category: product.category,
                  barcode: '',
                  alternatives: [],
                  certifications: ['Eco-Friendly']
                }}
                onPress={() => {}}
              />
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.arButton}
          onPress={() => router.push('/ar-visualization')}
        >
          <LinearGradient
            colors={['#3498DB', '#2980B9']}
            style={styles.arButtonGradient}
          >
            <Eye size={24} color="#FFFFFF" />
            <Text style={styles.arButtonText}>View in AR</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#2C3E50',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  content: {
    flex: 1,
  },
  productHeader: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 16,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  productInfo: {
    alignItems: 'center',
  },
  brand: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  productName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 8,
  },
  category: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#95A5A6',
    marginBottom: 16,
  },
  certifications: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  certificationBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  certificationText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#27AE60',
  },
  breakdownSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#2C3E50',
    marginBottom: 16,
    textAlign: 'center',
  },
  breakdownGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  breakdownItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
  },
  breakdownIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  breakdownLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#2C3E50',
    marginBottom: 4,
  },
  breakdownValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#E74C3C',
    marginBottom: 4,
  },
  breakdownDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  alternativesSection: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  alternativesHeader: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  alternativesSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 4,
  },
  arButton: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  arButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
  },
  arButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 20,
  },
});