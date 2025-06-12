import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BookOpen, Target, Award, Users, Lightbulb, Leaf } from 'lucide-react-native';
import ChallengeCard from '@/components/ChallengeCard';
import { mockChallenges, educationalTips } from '@/data/mockData';

export default function Impact() {
  const [activeTab, setActiveTab] = useState<'tips' | 'challenges' | 'community'>('tips');

  const renderTips = () => (
    <View style={styles.tipsContainer}>
      {educationalTips.map((tip) => (
        <View key={tip.id} style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <Lightbulb size={20} color="#F39C12" />
            <Text style={styles.tipCategory}>{tip.category.toUpperCase()}</Text>
            <View style={[styles.impactBadge, {
              backgroundColor: tip.impact === 'High' ? '#E74C3C' : '#F39C12'
            }]}>
              <Text style={styles.impactText}>{tip.impact}</Text>
            </View>
          </View>
          <Text style={styles.tipTitle}>{tip.title}</Text>
          <Text style={styles.tipDescription}>{tip.description}</Text>
        </View>
      ))}
    </View>
  );

  const renderChallenges = () => (
    <View>
      {mockChallenges.map((challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
    </View>
  );

  const renderCommunity = () => (
    <View style={styles.communityContainer}>
      <View style={styles.communityCard}>
        <Users size={24} color="#3498DB" />
        <Text style={styles.communityTitle}>Join the Movement</Text>
        <Text style={styles.communityDescription}>
          Connect with 50,000+ eco-conscious shoppers worldwide
        </Text>
        <TouchableOpacity style={styles.communityButton}>
          <Text style={styles.communityButtonText}>Join Community</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.leaderboard}>
        <Text style={styles.leaderboardTitle}>Top Carbon Savers This Week</Text>
        {[
          { name: 'Alex M.', saved: '12.5kg', rank: 1 },
          { name: 'Sarah K.', saved: '11.2kg', rank: 2 },
          { name: 'Mike D.', saved: '9.8kg', rank: 3 },
          { name: 'You', saved: '8.4kg', rank: 4 },
        ].map((user) => (
          <View key={user.rank} style={styles.leaderboardItem}>
            <View style={styles.rankContainer}>
              <Text style={styles.rank}>#{user.rank}</Text>
            </View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userSaved}>{user.saved} CO₂</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#16A085', '#1ABC9C']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Environmental Impact</Text>
        <Text style={styles.headerSubtitle}>Learn, challenge yourself, and connect</Text>
      </LinearGradient>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'tips' && styles.activeTab]}
          onPress={() => setActiveTab('tips')}
        >
          <Lightbulb size={16} color={activeTab === 'tips' ? '#16A085' : '#7F8C8D'} />
          <Text style={[styles.tabText, activeTab === 'tips' && styles.activeTabText]}>
            Tips
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'challenges' && styles.activeTab]}
          onPress={() => setActiveTab('challenges')}
        >
          <Target size={16} color={activeTab === 'challenges' ? '#16A085' : '#7F8C8D'} />
          <Text style={[styles.tabText, activeTab === 'challenges' && styles.activeTabText]}>
            Challenges
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'community' && styles.activeTab]}
          onPress={() => setActiveTab('community')}
        >
          <Users size={16} color={activeTab === 'community' ? '#16A085' : '#7F8C8D'} />
          <Text style={[styles.tabText, activeTab === 'community' && styles.activeTabText]}>
            Community
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'tips' && renderTips()}
        {activeTab === 'challenges' && renderChallenges()}
        {activeTab === 'community' && renderCommunity()}
        
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
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: -12,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#E8F5E8',
  },
  tabText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 6,
  },
  activeTabText: {
    color: '#16A085',
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  tipsContainer: {
    paddingHorizontal: 16,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipCategory: {
    fontFamily: 'Inter-Bold',
    fontSize: 11,
    color: '#7F8C8D',
    marginLeft: 8,
    flex: 1,
    letterSpacing: 1,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  impactText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  tipTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 8,
  },
  tipDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  communityContainer: {
    paddingHorizontal: 16,
  },
  communityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  communityTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#2C3E50',
    marginTop: 16,
    marginBottom: 8,
  },
  communityDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  communityButton: {
    backgroundColor: '#3498DB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  communityButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  leaderboard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  leaderboardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 16,
    textAlign: 'center',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  rankContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#16A085',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rank: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  userName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#2C3E50',
    flex: 1,
  },
  userSaved: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#16A085',
  },
  bottomSpacing: {
    height: 20,
  },
});