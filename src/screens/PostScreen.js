import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Facebook-inspired color scheme
const colors = {
  primary: '#1877F2',
  background: '#F0F2F5',
  white: '#FFFFFF',
  textPrimary: '#1C1E21',
  textSecondary: '#65676B',
  border: '#E4E6EA',
  success: '#42B72A',
  inactive: '#8A8D91',
  lightBlue: '#E7F3FF',
  danger: '#E41E3F',
};

const PostScreen = ({ navigation }) => {
  const [postText, setPostText] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);
  const [postType, setPostType] = useState('text'); // text, photo, poll
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [privacy, setPrivacy] = useState('public');

  const [user] = useState({
    name: 'João Silva',
    avatar: 'https://via.placeholder.com/40x40/1877F2/FFFFFF?text=JS',
  });

  const [pets] = useState([
    {
      id: 1,
      name: 'Rex',
      species: 'Cão',
      avatar: 'https://via.placeholder.com/40x40/FF6B6B/FFFFFF?text=🐕',
    },
    {
      id: 2,
      name: 'Luna',
      species: 'Gato',
      avatar: 'https://via.placeholder.com/40x40/4ECDC4/FFFFFF?text=🐱',
    },
    {
      id: 3,
      name: 'Buddy',
      species: 'Cão',
      avatar: 'https://via.placeholder.com/40x40/45B7D1/FFFFFF?text=🐕',
    },
  ]);

  const handlePost = () => {
    if (!postText.trim() && postType === 'text') {
      Alert.alert('Erro', 'Digite algo para publicar!');
      return;
    }

    if (postType === 'poll' && pollOptions.some(option => !option.trim())) {
      Alert.alert('Erro', 'Preencha todas as opções da enquete!');
      return;
    }

    Alert.alert('Sucesso', 'Post publicado com sucesso!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const addPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, '']);
    }
  };

  const removePollOption = (index) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const updatePollOption = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const PetSelector = () => (
    <View style={styles.petSelector}>
      <Text style={styles.selectorLabel}>Publicar como:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.petScroll}>
        <TouchableOpacity
          style={[styles.petOption, !selectedPet && styles.selectedPetOption]}
          onPress={() => setSelectedPet(null)}
        >
          <Image source={{ uri: user.avatar }} style={styles.petAvatar} />
          <Text style={styles.petName}>Você</Text>
        </TouchableOpacity>
        
        {pets.map((pet) => (
          <TouchableOpacity
            key={pet.id}
            style={[styles.petOption, selectedPet?.id === pet.id && styles.selectedPetOption]}
            onPress={() => setSelectedPet(pet)}
          >
            <Image source={{ uri: pet.avatar }} style={styles.petAvatar} />
            <Text style={styles.petName}>{pet.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const PrivacySelector = () => (
    <TouchableOpacity style={styles.privacySelector}>
      <View style={styles.privacyInfo}>
        <Ionicons 
          name={privacy === 'public' ? 'globe-outline' : privacy === 'friends' ? 'people-outline' : 'lock-closed-outline'} 
          size={16} 
          color={colors.textSecondary} 
        />
        <Text style={styles.privacyText}>
          {privacy === 'public' ? 'Público' : privacy === 'friends' ? 'Amigos' : 'Apenas eu'}
        </Text>
      </View>
      <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: selectedPet ? selectedPet.avatar : user.avatar }} 
            style={styles.userAvatar} 
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>
              {selectedPet ? `${user.name} com ${selectedPet.name}` : user.name}
            </Text>
            <PrivacySelector />
          </View>
        </View>

        {/* Pet Selector */}
        <PetSelector />

        {/* Post Type Selector */}
        <View style={styles.postTypeSelector}>
          <TouchableOpacity
            style={[styles.typeButton, postType === 'text' && styles.activeTypeButton]}
            onPress={() => setPostType('text')}
          >
            <Ionicons name="text" size={20} color={postType === 'text' ? colors.white : colors.textSecondary} />
            <Text style={[styles.typeButtonText, postType === 'text' && styles.activeTypeButtonText]}>
              Texto
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.typeButton, postType === 'photo' && styles.activeTypeButton]}
            onPress={() => setPostType('photo')}
          >
            <Ionicons name="camera" size={20} color={postType === 'photo' ? colors.white : colors.textSecondary} />
            <Text style={[styles.typeButtonText, postType === 'photo' && styles.activeTypeButtonText]}>
              Foto
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.typeButton, postType === 'poll' && styles.activeTypeButton]}
            onPress={() => setPostType('poll')}
          >
            <Ionicons name="bar-chart" size={20} color={postType === 'poll' ? colors.white : colors.textSecondary} />
            <Text style={[styles.typeButtonText, postType === 'poll' && styles.activeTypeButtonText]}>
              Enquete
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content Input */}
        <View style={styles.contentContainer}>
          {postType === 'text' && (
            <TextInput
              style={styles.textInput}
              placeholder={`O que você quer compartilhar${selectedPet ? ` sobre ${selectedPet.name}` : ''}?`}
              value={postText}
              onChangeText={setPostText}
              multiline
              placeholderTextColor={colors.textSecondary}
              autoFocus
            />
          )}

          {postType === 'photo' && (
            <View style={styles.photoContainer}>
              <TouchableOpacity style={styles.addPhotoButton}>
                <Ionicons name="camera" size={40} color={colors.textSecondary} />
                <Text style={styles.addPhotoText}>Adicionar foto</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.photoCaption}
                placeholder="Escreva uma legenda..."
                value={postText}
                onChangeText={setPostText}
                multiline
                placeholderTextColor={colors.textSecondary}
              />
            </View>
          )}

          {postType === 'poll' && (
            <View style={styles.pollContainer}>
              <TextInput
                style={styles.pollQuestion}
                placeholder="Faça uma pergunta..."
                value={postText}
                onChangeText={setPostText}
                placeholderTextColor={colors.textSecondary}
              />
              
              <Text style={styles.pollOptionsLabel}>Opções:</Text>
              {pollOptions.map((option, index) => (
                <View key={index} style={styles.pollOptionContainer}>
                  <TextInput
                    style={styles.pollOptionInput}
                    placeholder={`Opção ${index + 1}`}
                    value={option}
                    onChangeText={(value) => updatePollOption(index, value)}
                    placeholderTextColor={colors.textSecondary}
                  />
                  {pollOptions.length > 2 && (
                    <TouchableOpacity
                      style={styles.removePollOption}
                      onPress={() => removePollOption(index)}
                    >
                      <Ionicons name="close-circle" size={20} color={colors.danger} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              
              {pollOptions.length < 4 && (
                <TouchableOpacity style={styles.addPollOption} onPress={addPollOption}>
                  <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
                  <Text style={styles.addPollOptionText}>Adicionar opção</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {/* Additional Options */}
        <View style={styles.additionalOptions}>
          <Text style={styles.optionsTitle}>Adicionar ao seu post</Text>
          
          <View style={styles.optionsGrid}>
            <TouchableOpacity style={styles.optionButton}>
              <Ionicons name="location" size={24} color={colors.success} />
              <Text style={styles.optionText}>Localização</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionButton}>
              <Ionicons name="pricetag" size={24} color={colors.primary} />
              <Text style={styles.optionText}>Marcar pets</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionButton}>
              <Ionicons name="happy" size={24} color={colors.inactive} />
              <Text style={styles.optionText}>Sentimento</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionButton}>
              <Ionicons name="calendar" size={24} color={colors.danger} />
              <Text style={styles.optionText}>Evento</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Post Button */}
      <View style={styles.postButtonContainer}>
        <TouchableOpacity
          style={[
            styles.postButton,
            (!postText.trim() && postType !== 'photo') && styles.disabledPostButton
          ]}
          onPress={handlePost}
          disabled={!postText.trim() && postType !== 'photo'}
        >
          <Text style={[
            styles.postButtonText,
            (!postText.trim() && postType !== 'photo') && styles.disabledPostButtonText
          ]}>
            Publicar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
  },
  userDetails: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  privacySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  privacyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  privacyText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 4,
    marginRight: 8,
  },
  petSelector: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectorLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  petScroll: {
    paddingLeft: 16,
  },
  petOption: {
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPetOption: {
    borderColor: colors.primary,
    backgroundColor: colors.lightBlue,
  },
  petAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.border,
    marginBottom: 4,
  },
  petName: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  postTypeSelector: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 4,
    backgroundColor: colors.background,
  },
  activeTypeButton: {
    backgroundColor: colors.primary,
  },
  typeButtonText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeTypeButtonText: {
    color: colors.white,
  },
  contentContainer: {
    backgroundColor: colors.white,
    minHeight: 200,
    borderBottomWidth: 8,
    borderBottomColor: colors.background,
  },
  textInput: {
    fontSize: 18,
    color: colors.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 16,
    textAlignVertical: 'top',
    minHeight: 200,
  },
  photoContainer: {
    padding: 16,
  },
  addPhotoButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingVertical: 40,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  addPhotoText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
  },
  photoCaption: {
    fontSize: 16,
    color: colors.textPrimary,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  pollContainer: {
    padding: 16,
  },
  pollQuestion: {
    fontSize: 18,
    color: colors.textPrimary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 16,
    marginBottom: 16,
  },
  pollOptionsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  pollOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pollOptionInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  removePollOption: {
    marginLeft: 8,
    padding: 4,
  },
  addPollOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  addPollOptionText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  additionalOptions: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  postButtonContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  postButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  disabledPostButton: {
    backgroundColor: colors.inactive,
  },
  postButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  disabledPostButtonText: {
    color: colors.background,
  },
});

export default PostScreen;

