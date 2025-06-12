import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Scan, TrendingUp, Award, Leaf, Target, Zap } from 'lucide-react-native';
import { router } from 'expo-router';
import StatCard from '@/components/StatCard';
import ChallengeCard from '@/components/ChallengeCard';
import { mockUserStats, mockChallenges } from '@/data/mockData';

export default function Dashboard() {
  const stats = mockUserStats;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#16A085', '#1ABC9C']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Good morning! 🌱</Text>
          <Text style={styles.subtitle}>Let's make sustainable choices today</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.scanButton}
          onPress={() => router.push('/scanner')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#FFFFFF', '#F8F9FA']}
            style={styles.scanButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Scan size={24} color="#16A085" />
            <Text style={styles.scanButtonText}>Scan Product</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <StatCard
              title="Total Scans"
              value={stats.totalScans.toString()}
              subtitle="products analyzed"
              icon={Scan}
              gradient={['#3498DB', '#2980B9']}
              iconColor="#FFFFFF"
            />
            <StatCard
              title="Carbon Saved"
              value={`${stats.carbonSaved}kg`}
              subtitle="CO₂ reduced"
              icon={Leaf}
              gradient={['#27AE60', '#2ECC71']}
              iconColor="#FFFFFF"
            />
          </View>
          <View style={styles.statsRow}>
            <StatCard
              title="Tree Equivalent"
              value={stats.treesEquivalent.toString()}
              subtitle="trees planted"
              icon={TrendingUp}
              gradient={['#8E44AD', '#9B59B6']}
              iconColor="#FFFFFF"
            />
            <StatCard
              title="Current Streak"
              value={`${stats.currentStreak} days`}
              subtitle="keep it up!"
              icon={Zap}
              gradient={['#F39C12', '#E67E22']}
              iconColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={20} color="#2C3E50" />
            <Text style={styles.sectionTitle}>Active Challenges</Text>
          </View>
          {mockChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Award size={20} color="#2C3E50" />
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
          </View>
          <View style={styles.achievementsContainer}>
            {stats.achievements.slice(0, 3).map((achievement) => (
              <View key={achievement.id} style={styles.achievementItem}>
                <View style={styles.achievementIcon}>
                  <Award size={16} color="#F39C12" />
                </View>
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

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
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    marginBottom: 24,
  },
  greeting: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scanButton: {
    alignSelf: 'center',
  },
  scanButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  scanButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#16A085',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    marginTop: -12,
  },
  statsContainer: {
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#2C3E50',
    marginLeft: 8,
  },
  achievementsContainer: {
    paddingHorizontal: 24,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 2,
  },
  achievementDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#7F8C8D',
  },
  bottomSpacing: {
    height: 20,
  },
});