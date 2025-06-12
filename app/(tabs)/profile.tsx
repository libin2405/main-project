import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  User, 
  Settings, 
  Award, 
  BarChart3, 
  Bell, 
  Shield, 
  Share2, 
  HelpCircle,
  ChevronRight,
  Target,
  Calendar
} from 'lucide-react-native';
import { mockUserStats } from '@/data/mockData';

export default function Profile() {
  const stats = mockUserStats;

  const menuItems = [
    { id: 'goals', icon: Target, title: 'Set Monthly Goals', subtitle: 'Customize your carbon reduction targets' },
    { id: 'reports', icon: BarChart3, title: 'Impact Reports', subtitle: 'Detailed monthly environmental reports' },
    { id: 'achievements', icon: Award, title: 'All Achievements', subtitle: `${stats.achievements.length} badges earned` },
    { id: 'notifications', icon: Bell, title: 'Notifications', subtitle: 'Manage your alert preferences' },
    { id: 'privacy', icon: Shield, title: 'Privacy & Data', subtitle: 'Control your data and privacy settings' },
    { id: 'share', icon: Share2, title: 'Share EcoScan', subtitle: 'Invite friends to join the movement' },
    { id: 'help', icon: HelpCircle, title: 'Help & Support', subtitle: 'Get help and contact support' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#16A085', '#1ABC9C']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <User size={32} color="#FFFFFF" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Eco Warrior</Text>
            <Text style={styles.userEmail}>eco.warrior@example.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Settings size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.totalScans}</Text>
            <Text style={styles.statLabel}>Scans</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.carbonSaved}kg</Text>
            <Text style={styles.statLabel}>CO₂ Saved</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.goalProgress}>
          <View style={styles.goalHeader}>
            <Calendar size={20} color="#16A085" />
            <Text style={styles.goalTitle}>Monthly Goal Progress</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${Math.min((stats.carbonSaved / stats.monthlyGoal) * 100, 100)}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {stats.carbonSaved}kg / {stats.monthlyGoal}kg CO₂ reduction
            </Text>
          </View>
        </View>

        <View style={styles.recentAchievements}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.achievementsList}>
            {stats.achievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievementCard}>
                <View style={styles.achievementIcon}>
                  <Award size={20} color="#F39C12" />
                </View>
                <Text style={styles.achievementName}>{achievement.title}</Text>
                <Text style={styles.achievementDate}>
                  {achievement.unlockedAt.toLocaleDateString()}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <View style={styles.menuIcon}>
                  <item.icon size={20} color="#16A085" />
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <ChevronRight size={20} color="#BDC3C7" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>EcoScan v1.0.0</Text>
          <Text style={styles.appDescription}>
            Making sustainable choices easier, one scan at a time.
          </Text>
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
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    marginTop: -12,
  },
  goalProgress: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#2C3E50',
    marginLeft: 8,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#16A085',
    borderRadius: 4,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#7F8C8D',
  },
  recentAchievements: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#2C3E50',
    marginBottom: 16,
  },
  achievementsList: {
    paddingLeft: 0,
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    width: 120,
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
    marginBottom: 8,
  },
  achievementName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: '#7F8C8D',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#7F8C8D',
  },
  appInfo: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  appVersion: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  appDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#95A5A6',
    textAlign: 'center',
    lineHeight: 18,
  },
  bottomSpacing: {
    height: 20,
  },
});