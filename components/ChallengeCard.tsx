import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Target, Clock } from 'lucide-react-native';
import { Challenge } from '@/types/carbon';

interface ChallengeCardProps {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const progress = (challenge.current / challenge.target) * 100;
  const daysLeft = Math.ceil((challenge.expiresAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={challenge.type === 'weekly' ? ['#3498DB', '#2980B9'] : ['#9B59B6', '#8E44AD']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <Target size={20} color="#FFFFFF" />
          <Text style={styles.challengeType}>{challenge.type.toUpperCase()}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Clock size={16} color="rgba(255, 255, 255, 0.8)" />
          <Text style={styles.timeText}>{daysLeft} days left</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.title}>{challenge.title}</Text>
        <Text style={styles.description}>{challenge.description}</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>
              {challenge.current} / {challenge.target}
            </Text>
            <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
          </View>
        </View>

        <View style={styles.reward}>
          <Text style={styles.rewardLabel}>Reward:</Text>
          <Text style={styles.rewardText}>{challenge.reward}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeType: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 8,
    letterSpacing: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
  content: {
    padding: 16,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#2C3E50',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#2C3E50',
  },
  progressPercentage: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#16A085',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#16A085',
    borderRadius: 4,
  },
  reward: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#7F8C8D',
    marginRight: 8,
  },
  rewardText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#16A085',
    flex: 1,
  },
});